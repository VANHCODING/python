import { useState, useEffect, useRef, useCallback } from 'react';
import { TestCase, TestResult, ExecutionResult } from '../types';

export interface PyodideState {
  isReady: boolean;
  isLoading: boolean;
  loadingStage: string;
  isRunning: boolean;
  isTesting: boolean;
  lastExecution: ExecutionResult | null;
  testResults: TestResult[] | null;
  testSummary: { total: number; passed: number; allPassed: boolean } | null;
}

const EXECUTION_TIMEOUT_MS = 8000; // 8 seconds timeout protection against while True

export function usePyodide() {
  const [state, setState] = useState<PyodideState>({
    isReady: false,
    isLoading: true,
    loadingStage: 'Khởi tạo Web Worker...',
    isRunning: false,
    isTesting: false,
    lastExecution: null,
    testResults: null,
    testSummary: null,
  });

  const workerRef = useRef<Worker | null>(null);
  const timeoutTimerRef = useRef<number | null>(null);
  const lastRunningTestRef = useRef<{ id: string; label: string } | null>(null);

  const clearTimer = () => {
    if (timeoutTimerRef.current !== null) {
      window.clearTimeout(timeoutTimerRef.current);
      timeoutTimerRef.current = null;
    }
  };

  const createWorker = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
    }

    const worker = new Worker(
      new URL('../workers/pyodide.worker.ts', import.meta.url),
      { type: 'module' }
    );

    worker.onmessage = (event: MessageEvent) => {
      const msg = event.data;

      if (msg.type === 'LOADING') {
        setState((prev) => ({ ...prev, loadingStage: msg.stage, isLoading: true }));
      } else if (msg.type === 'READY') {
        setState((prev) => ({
          ...prev,
          isReady: true,
          isLoading: false,
          loadingStage: 'Python 3 đã sẵn sàng!',
        }));
      } else if (msg.type === 'RUN_SUCCESS') {
        clearTimer();
        setState((prev) => ({
          ...prev,
          isRunning: false,
          lastExecution: msg.data,
        }));
      } else if (msg.type === 'RUN_ERROR') {
        clearTimer();
        setState((prev) => ({
          ...prev,
          isRunning: false,
          lastExecution: {
            success: false,
            stdout: msg.stdout,
            stderr: msg.stderr,
            error: msg.error,
            executionTimeMs: 0,
          },
        }));
      } else if (msg.type === 'TEST_PROGRESS') {
        lastRunningTestRef.current = { id: msg.id, label: msg.label };
      } else if (msg.type === 'TESTS_COMPLETE') {
        clearTimer();
        setState((prev) => ({
          ...prev,
          isTesting: false,
          testResults: msg.results,
          testSummary: msg.summary,
        }));
      } else if (msg.type === 'TESTS_ERROR') {
        clearTimer();
        setState((prev) => ({
          ...prev,
          isTesting: false,
          lastExecution: {
            success: false,
            stdout: msg.stdout || '',
            stderr: '',
            error: msg.error,
            executionTimeMs: 0,
          },
        }));
      }
    };

    worker.onerror = (err) => {
      console.error('Worker error:', err);
      clearTimer();
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isRunning: false,
        isTesting: false,
        lastExecution: {
          success: false,
          stdout: '',
          stderr: '',
          error: `Lỗi luồng Worker: ${err.message || 'Không xác định'}`,
          executionTimeMs: 0,
        },
      }));
    };

    worker.postMessage({ type: 'INIT' });
    workerRef.current = worker;
  }, []);

  useEffect(() => {
    createWorker();
    return () => {
      clearTimer();
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, [createWorker]);

  // Handle timeout by killing and re-spawning worker
  const handleTimeout = (type: 'run' | 'test') => {
    if (workerRef.current) {
      workerRef.current.terminate();
    }
    const testInfo =
      type === 'test' && lastRunningTestRef.current
        ? ` ở test case "${lastRunningTestRef.current.label || lastRunningTestRef.current.id}"`
        : '';
    const timeoutMsg =
      `⏱️ Quá thời gian thực thi (Timeout > 8s)${testInfo}!\n\n💡 Nguyên nhân phổ biến: Code của bạn đang gặp vòng lặp vô tận (ví dụ: while True không có break hoặc biến điều kiện không đổi giá trị), hoặc phép toán quá nặng.\n\nĐã tự động khởi động lại môi trường Python.`;

    setState((prev) => ({
      ...prev,
      isRunning: false,
      isTesting: false,
      isLoading: true,
      loadingStage: 'Khởi động lại môi trường...',
      lastExecution:
        type === 'run'
          ? {
              success: false,
              stdout: '',
              stderr: '',
              error: timeoutMsg,
              executionTimeMs: 8000,
            }
          : prev.lastExecution,
      testSummary:
        type === 'test'
          ? {
              total: 1,
              passed: 0,
              allPassed: false,
            }
          : prev.testSummary,
      testResults:
        type === 'test'
          ? [
              {
                testCaseId: 'timeout',
                description: 'Kiểm tra thời gian thực thi',
                passed: false,
                input: 'Execution timeout',
                expected: 'Kết thúc trong < 8s',
                actual: 'Infinite loop',
                error: timeoutMsg,
              },
            ]
          : prev.testResults,
    }));

    // Re-create worker
    createWorker();
  };

  const runCode = useCallback(
    (code: string) => {
      if (!workerRef.current || !state.isReady || state.isRunning || state.isTesting) return;
      clearTimer();
      setState((prev) => ({
        ...prev,
        isRunning: true,
        lastExecution: null,
      }));

      timeoutTimerRef.current = window.setTimeout(() => {
        handleTimeout('run');
      }, EXECUTION_TIMEOUT_MS);

      workerRef.current.postMessage({
        type: 'RUN_CODE',
        code,
      });
    },
    [state.isReady, state.isRunning, state.isTesting]
  );

  const runTests = useCallback(
    (code: string, testCases: TestCase[], targetFunction?: string) => {
      if (!workerRef.current || !state.isReady || state.isRunning || state.isTesting) return;
      clearTimer();
      lastRunningTestRef.current = null;
      setState((prev) => ({
        ...prev,
        isTesting: true,
        testResults: null,
        testSummary: null,
      }));

      timeoutTimerRef.current = window.setTimeout(() => {
        handleTimeout('test');
      }, EXECUTION_TIMEOUT_MS);

      workerRef.current.postMessage({
        type: 'RUN_TESTS',
        code,
        testCases,
        targetFunction,
      });
    },
    [state.isReady, state.isRunning, state.isTesting]
  );

  const resetOutputs = useCallback(() => {
    setState((prev) => ({
      ...prev,
      lastExecution: null,
      testResults: null,
      testSummary: null,
    }));
  }, []);

  return {
    ...state,
    runCode,
    runTests,
    resetOutputs,
  };
}
