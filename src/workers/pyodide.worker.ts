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
import ast

test_cases = json.loads(__TEST_CASES_JSON__)
target_func_name = __TARGET_FUNC__

def are_equal(actual, expected):
    if actual == expected:
        return True
    # Compare tuple vs list (JSON converts tuples to arrays/lists)
    if isinstance(actual, (tuple, list)) and isinstance(expected, (tuple, list)):
        if len(actual) != len(expected):
            return False
        return all(are_equal(a, e) for a, e in zip(actual, expected))
    # Compare dict
    if isinstance(actual, dict) and isinstance(expected, dict):
        if set(actual.keys()) != set(expected.keys()):
            return False
        return all(are_equal(actual[k], expected[k]) for k in actual)
    # Compare float with small tolerance
    if isinstance(actual, (int, float)) and isinstance(expected, (int, float)):
        return abs(actual - expected) < 1e-4
    return False

def safe_serialize(obj):
    if isinstance(obj, (int, float, str, bool)) or obj is None:
        return obj
    if isinstance(obj, (list, tuple)):
        return [safe_serialize(x) for x in obj]
    if isinstance(obj, set):
        return [safe_serialize(x) for x in sorted(list(obj), key=str)]
    if isinstance(obj, dict):
        return {str(k): safe_serialize(v) for k, v in obj.items()}
    return str(obj)

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
    # If target function is specified, verify it exists (only for function-based tests)
    has_func_tests = any(tc.get("type", "function") == "function" for tc in test_cases)
    if target_func_name and has_func_tests and target_func_name not in user_ns:
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
            mock_vars = tc.get("mockVariables")
            expected_vars = tc.get("expectedVariables")
            
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
                        # Value equality check with tuple/list/float tolerance
                        tc_passed = are_equal(tc_actual, expected)
                    elif tc_type == "stdout":
                        # Compare captured script output
                        actual_out = cap_compile.get_stdout().strip()
                        tc_actual = actual_out
                        tc_passed = (str(actual_out).strip() == str(expected).strip())
                    elif tc_type == "variable":
                        # Multi-scenario dynamic injection or single-run variable check
                        if mock_vars:
                            scenario_tree = ast.parse(__USER_CODE__)
                            new_body = []
                            for node in scenario_tree.body:
                                if isinstance(node, ast.Assign):
                                    targets = [t.id for t in node.targets if isinstance(t, ast.Name)]
                                    if any(t in mock_vars for t in targets):
                                        continue
                                elif isinstance(node, ast.AnnAssign) and isinstance(node.target, ast.Name):
                                    if node.target.id in mock_vars:
                                        continue
                                new_body.append(node)
                            scenario_tree.body = new_body
                            compiled = compile(scenario_tree, filename='<scenario>', mode='exec')
                            scenario_ns = {"__name__": "__main__"}
                            scenario_ns.update(mock_vars)
                            exec(compiled, scenario_ns)

                            if expected_vars:
                                tc_actual = {}
                                missing = []
                                failed = []
                                for k, v in expected_vars.items():
                                    if k not in scenario_ns:
                                        missing.append(k)
                                    else:
                                        act_val = scenario_ns[k]
                                        tc_actual[k] = act_val
                                        if not are_equal(act_val, v):
                                            failed.append(k)
                                if missing:
                                    tc_passed = False
                                    tc_err = f"Chưa tìm thấy biến: {', '.join(missing)} trong kịch bản kiểm thử."
                                elif failed:
                                    tc_passed = False
                                else:
                                    tc_passed = True
                            else:
                                var_name = tc.get("variable", "")
                                if var_name not in scenario_ns:
                                    tc_passed = False
                                    tc_err = f"Chưa tìm thấy biến '{var_name}' trong bài làm."
                                else:
                                    tc_actual = scenario_ns[var_name]
                                    tc_passed = are_equal(tc_actual, expected)
                        else:
                            # Standard check on original user namespace
                            if expected_vars:
                                tc_actual = {}
                                missing = []
                                failed = []
                                for k, v in expected_vars.items():
                                    if k not in user_ns:
                                        missing.append(k)
                                    else:
                                        act_val = user_ns[k]
                                        tc_actual[k] = act_val
                                        if not are_equal(act_val, v):
                                            failed.append(k)
                                if missing:
                                    tc_passed = False
                                    tc_err = f"Chưa tìm thấy biến: {', '.join(missing)} trong bài làm."
                                elif failed:
                                    tc_passed = False
                                else:
                                    tc_passed = True
                            else:
                                var_name = tc.get("variable", "")
                                if var_name not in user_ns:
                                    tc_passed = False
                                    tc_err = f"Chưa tìm thấy biến '{var_name}' trong bài làm. Hãy khai báo biến '{var_name}'!"
                                else:
                                    tc_actual = user_ns[var_name]
                                    tc_passed = are_equal(tc_actual, expected)
                except Exception as e:
                    e_info = friendly_error_info(e)
                    tc_err = f"{e_info['type']}: {e_info['message']}"
                    if e_info['hint']:
                        tc_err += f"\\n{e_info['hint']}"

            if not tc_passed:
                all_passed = False

            # Format input and expected labels
            if mock_vars:
                display_input = mock_vars
            elif tc_type == "variable":
                display_input = f"Biến: {tc.get('variable')}"
            elif tc_type == "stdout":
                display_input = "Đầu ra màn hình (print)"
            else:
                display_input = inputs

            display_expected = expected_vars if expected_vars else expected

            results.append({
                "testCaseId": tc["id"],
                "description": tc.get("description", ""),
                "passed": tc_passed,
                "input": display_input,
                "expected": display_expected,
                "actual": safe_serialize(tc_actual),
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
