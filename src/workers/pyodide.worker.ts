// Pyodide Web Worker for isolated Python execution and auto-grading
// Runs in background thread to avoid freezing UI on infinite loops or heavy calculations

let pyodide: any = null;
let isInitializing = false;

async function getPyodide() {
  if (pyodide) return pyodide;
  if (isInitializing) {
    while (isInitializing) {
      await new Promise((r) => setTimeout(r, 100));
    }
    return pyodide;
  }

  isInitializing = true;
  self.postMessage({ type: 'LOADING', stage: 'Đang tải Python WebAssembly Runtime...' });

  try {
    // Load Pyodide via dynamic import of ES module from jsDelivr CDN
    // @ts-ignore
    const pyodideModule = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.mjs');
    self.postMessage({ type: 'LOADING', stage: 'Khởi tạo môi trường CPython...' });

    pyodide = await pyodideModule.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/',
    });

    self.postMessage({ type: 'LOADING', stage: 'Cài đặt bộ bắt đầu ra (I/O)...' });

    // Setup helper python execution wrapper
    await pyodide.runPythonAsync(`
import sys
import io
import json
import traceback

class CaptureOutput:
    def __enter__(self):
        self._stdout = sys.stdout
        self._stderr = sys.stderr
        sys.stdout = self.stdout_buffer = io.StringIO()
        sys.stderr = self.stderr_buffer = io.StringIO()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        sys.stdout = self._stdout
        sys.stderr = self._stderr

    def get_stdout(self):
        return self.stdout_buffer.getvalue()

    def get_stderr(self):
        return self.stderr_buffer.getvalue()

def friendly_error_info(exc):
    err_type = type(exc).__name__
    msg = str(exc)
    hint = ""
    if err_type == "IndentationError":
        hint = "💡 Gợi ý: Lỗi thụt lề! Trong Python, các câu lệnh trong cùng khối (sau dấu :, if, def, for...) phải thụt lề đều nhau (chuẩn 4 dấu cách)."
    elif err_type == "SyntaxError":
        hint = "💡 Gợi ý: Lỗi cú pháp! Kiểm tra xem bạn có quên dấu hai chấm ':', quên đóng ngoặc ')' hay dấu nháy kép không."
    elif err_type == "NameError":
        hint = f"💡 Gợi ý: Bạn đang gọi một biến hoặc hàm chưa được định nghĩa. Hãy kiểm tra lại lỗi chính tả."
    elif err_type == "TypeError":
        hint = "💡 Gợi ý: Lỗi kiểu dữ liệu (TypeError)! Ví dụ: cố tình cộng chuỗi với số mà chưa ép kiểu str(), hoặc truyền sai số lượng đối số cho hàm."
    elif err_type == "IndexError":
        hint = "💡 Gợi ý: Vượt quá giới hạn danh sách/chuỗi (Index out of range). Lưu ý Python đánh chỉ số từ 0 đến N - 1."
    elif err_type == "KeyError":
        hint = "💡 Gợi ý: Khóa (Key) không tồn tại trong Dictionary."
    elif err_type == "ZeroDivisionError":
        hint = "💡 Gợi ý: Lỗi chia cho 0! Mẫu số không được bằng 0."
    return {
        "type": err_type,
        "message": msg,
        "hint": hint,
        "traceback": traceback.format_exc()
    }
`);

    isInitializing = false;
    self.postMessage({ type: 'READY' });
    return pyodide;
  } catch (err: any) {
    isInitializing = false;
    self.postMessage({
      type: 'RUN_ERROR',
      error: `Không thể khởi tạo Pyodide WebAssembly: ${err.message || err}`,
      stdout: '',
      stderr: '',
    });
    throw err;
  }
}

// Handle messages from main thread
self.onmessage = async (event: MessageEvent) => {
  const { type } = event.data;

  if (type === 'INIT') {
    try {
      await getPyodide();
    } catch (e) {
      // Handled in getPyodide
    }
    return;
  }

  if (type === 'RUN_CODE') {
    const { code } = event.data;
    const startTime = performance.now();

    try {
      const py = await getPyodide();

      // Store code in python global to safely execute
      py.globals.set('__USER_CODE__', code);

      const runnerCode = `
import json

cap = CaptureOutput()
with cap:
    user_globals = {"__name__": "__main__"}
    exec_error = None
    try:
        exec(__USER_CODE__, user_globals)
    except Exception as e:
        exec_error = friendly_error_info(e)

out_stdout = cap.get_stdout()
out_stderr = cap.get_stderr()
json.dumps({
    "success": exec_error is None,
    "stdout": out_stdout,
    "stderr": out_stderr,
    "error_info": exec_error
})
`;
      const jsonRes = await py.runPythonAsync(runnerCode);
      const parsed = JSON.parse(jsonRes);
      const duration = Math.round(performance.now() - startTime);

      if (parsed.success) {
        self.postMessage({
          type: 'RUN_SUCCESS',
          data: {
            success: true,
            stdout: parsed.stdout,
            stderr: parsed.stderr,
            executionTimeMs: duration,
          },
        });
      } else {
        const err = parsed.error_info;
        const formattedErr = `${err.type}: ${err.message}${err.hint ? '\n\n' + err.hint : ''}\n\n${err.traceback}`;
        self.postMessage({
          type: 'RUN_ERROR',
          error: formattedErr,
          stdout: parsed.stdout,
          stderr: parsed.stderr,
        });
      }
    } catch (err: any) {
      self.postMessage({
        type: 'RUN_ERROR',
        error: `Lỗi thực thi: ${err.message || err}`,
        stdout: '',
        stderr: '',
      });
    }
    return;
  }

  if (type === 'RUN_TESTS') {
    const { code, testCases, targetFunction } = event.data;
    const startTime = performance.now();

    try {
      const py = await getPyodide();

      py.globals.set('__USER_CODE__', code);
      py.globals.set('__TEST_CASES_JSON__', JSON.stringify(testCases));
      py.globals.set('__TARGET_FUNC__', targetFunction || '');

      const graderCode = `
import json

test_cases = json.loads(__TEST_CASES_JSON__)
target_func_name = __TARGET_FUNC__

results = []
all_passed = True

# First, compile and run user code in isolated namespace
user_ns = {"__name__": "__main__"}
cap_compile = CaptureOutput()
with cap_compile:
    syntax_or_runtime_err = None
    try:
        exec(__USER_CODE__, user_ns)
    except Exception as e:
        syntax_or_runtime_err = friendly_error_info(e)

if syntax_or_runtime_err:
    # User code failed during definition/execution
    err_msg = f"{syntax_or_runtime_err['type']}: {syntax_or_runtime_err['message']}"
    if syntax_or_runtime_err['hint']:
        err_msg += f"\\n\\n{syntax_or_runtime_err['hint']}"
    err_msg += f"\\n\\n{syntax_or_runtime_err['traceback']}"
    
    for tc in test_cases:
        results.append({
            "testCaseId": tc["id"],
            "description": tc.get("description", ""),
            "passed": False,
            "input": tc.get("input"),
            "expected": tc.get("expected"),
            "actual": None,
            "error": err_msg,
            "hidden": tc.get("hidden", False)
        })
    all_passed = False
else:
    # If target function is specified, verify it exists
    if target_func_name and target_func_name not in user_ns:
        err_msg = f"Không tìm thấy hàm '{target_func_name}'! Vui lòng kiểm tra lại tên hàm bạn đã viết đúng như đề bài yêu cầu chưa (chú ý chữ hoa/thường)."
        for tc in test_cases:
            results.append({
                "testCaseId": tc["id"],
                "description": tc.get("description", ""),
                "passed": False,
                "input": tc.get("input"),
                "expected": tc.get("expected"),
                "actual": None,
                "error": err_msg,
                "hidden": tc.get("hidden", False)
            })
        all_passed = False
    else:
        for tc in test_cases:
            tc_type = tc.get("type", "function")
            expected = tc.get("expected")
            inputs = tc.get("input", [])
            
            tc_cap = CaptureOutput()
            tc_passed = False
            tc_actual = None
            tc_err = None

            with tc_cap:
                try:
                    if tc_type == "function":
                        fn = user_ns[target_func_name]
                        if isinstance(inputs, list):
                            tc_actual = fn(*inputs)
                        else:
                            tc_actual = fn(inputs)
                        # Value equality check
                        tc_passed = (tc_actual == expected)
                    elif tc_type == "stdout":
                        # Execute code or call function to inspect stdout
                        # In stdout tests, compare stripped stdout
                        actual_out = tc_cap.get_stdout().strip()
                        tc_actual = actual_out
                        tc_passed = (str(actual_out) == str(expected).strip())
                except Exception as e:
                    e_info = friendly_error_info(e)
                    tc_err = f"{e_info['type']}: {e_info['message']}"
                    if e_info['hint']:
                        tc_err += f"\\n{e_info['hint']}"

            if not tc_passed:
                all_passed = False

            results.append({
                "testCaseId": tc["id"],
                "description": tc.get("description", ""),
                "passed": tc_passed,
                "input": inputs,
                "expected": expected,
                "actual": tc_actual,
                "error": tc_err,
                "hidden": tc.get("hidden", False)
            })

passed_count = sum(1 for r in results if r["passed"])
json.dumps({
    "results": results,
    "summary": {
        "total": len(results),
        "passed": passed_count,
        "allPassed": all_passed
    }
})
`;
      const res = await py.runPythonAsync(graderCode);
      const parsed = JSON.parse(res);

      self.postMessage({
        type: 'TESTS_COMPLETE',
        results: parsed.results,
        summary: parsed.summary,
      });
    } catch (err: any) {
      self.postMessage({
        type: 'TESTS_ERROR',
        error: `Lỗi hệ thống chấm bài: ${err.message || err}`,
        stdout: '',
      });
    }
    return;
  }
};
