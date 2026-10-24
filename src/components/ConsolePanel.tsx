import React from 'react';
import { Terminal, CheckCircle2, XCircle, Clock, Trash2, AlertTriangle, ShieldCheck, Loader2 } from 'lucide-react';
import { ExecutionResult, TestResult } from '../types';
import { formatPythonValue, formatVariableMap } from '../utils/format';

interface ConsolePanelProps {
  execution: ExecutionResult | null;
  testResults: TestResult[] | null;
  testSummary: { total: number; passed: number; allPassed: boolean } | null;
  activeTab: 'terminal' | 'tests';
  onTabChange: (tab: 'terminal' | 'tests') => void;
  onClear: () => void;
  isRunning?: boolean;
  isTesting?: boolean;
}

export const ConsolePanel: React.FC<ConsolePanelProps> = ({
  execution,
  testResults,
  testSummary,
  activeTab,
  onTabChange,
  onClear,
  isRunning,
  isTesting,
}) => {
  return (
    <div className="h-full flex flex-col bg-zinc-950 border-t border-zinc-800/80">
      {/* Tab Header */}
      <div className="h-9 bg-zinc-900/80 border-b border-zinc-800/80 px-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onTabChange('terminal')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded transition-colors ${
              activeTab === 'terminal'
                ? 'bg-zinc-800 text-zinc-100'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Terminal</span>
          </button>

          <button
            onClick={() => onTabChange('tests')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded transition-colors relative ${
              activeTab === 'tests'
                ? 'bg-zinc-800 text-zinc-100'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Kết quả Test Cases</span>
            {testSummary && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  testSummary.allPassed
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-rose-500/20 text-rose-300'
                }`}
              >
                {testSummary.passed}/{testSummary.total}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {execution && execution.executionTimeMs > 0 && (
            <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-mono">
              <Clock className="w-3 h-3 text-zinc-500" />
              <span>{execution.executionTimeMs}ms</span>
            </div>
          )}

          <button
            onClick={onClear}
            className="p-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
            title="Xóa output"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content Area - Independent scroll container */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3 font-mono text-xs custom-scrollbar">
        {/* TAB 1: TERMINAL */}
        {activeTab === 'terminal' && (
          <div className="space-y-2">
            {isRunning ? (
              <div className="flex items-center gap-2 text-emerald-400 py-3 font-sans text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Đang thực thi mã nguồn Python...</span>
              </div>
            ) : !execution ? (
              <div className="text-zinc-600 italic select-none">
                Nhấn &quot;Chạy thử&quot; để xem kết quả xuất ra (stdout/print)...
              </div>
            ) : (
              <div className="space-y-2">
                {/* STDOUT */}
                {execution.stdout && (
                  <pre className="text-zinc-200 whitespace-pre-wrap leading-relaxed">
                    {execution.stdout}
                  </pre>
                )}

                {/* STDERR / ERROR */}
                {execution.error && (
                  <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-300 space-y-1 whitespace-pre-wrap font-sans">
                    <div className="flex items-center gap-1.5 font-bold text-rose-400 text-xs">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>Thông báo lỗi từ Python:</span>
                    </div>
                    <div className="font-mono text-xs pt-1">{execution.error}</div>
                  </div>
                )}

                {/* Return Result if no stdout and no error */}
                {!execution.stdout && !execution.error && (
                  <div className="text-emerald-400/80 italic">
                    Chương trình chạy thành công không có output (không gọi lệnh print).
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TEST RESULTS */}
        {activeTab === 'tests' && (
          <div className="space-y-3 font-sans">
            {isTesting ? (
              <div className="flex items-center gap-2 text-blue-400 py-3 font-sans text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                <span>Đang chạy bộ kiểm thử và chấm bài tự động...</span>
              </div>
            ) : !testResults ? (
              <div className="text-zinc-600 italic select-none font-mono">
                Nhấn &quot;Nộp bài &amp; Chấm&quot; để hệ thống chạy bộ kiểm thử tự động...
              </div>
            ) : (
              <div className="space-y-3">
                {/* Summary Banner */}
                {testSummary && (
                  <div
                    className={`p-3 rounded-xl border flex items-center justify-between ${
                      testSummary.allPassed
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                        : 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {testSummary.allPassed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      )}
                      <div>
                        <div className="text-xs font-bold">
                          {testSummary.allPassed
                            ? 'Chính xác 100%! Bạn đã giải quyết thành công bài tập này.'
                            : `Chưa đạt yêu cầu: Đúng ${testSummary.passed}/${testSummary.total} test cases.`}
                        </div>
                        <div className="text-[11px] opacity-80">
                          {testSummary.allPassed
                            ? 'Thuật toán hoạt động tối ưu trên mọi ca kiểm thử.'
                            : 'Hãy kiểm tra lại logic và các ca biên bên dưới nhé.'}
                        </div>
                      </div>
                    </div>

                    <span className="text-sm font-mono font-bold px-2 py-0.5 rounded bg-zinc-950/40">
                      {testSummary.passed}/{testSummary.total}
                    </span>
                  </div>
                )}

                {/* Test Cases Details */}
                <div className="space-y-2">
                  {testResults.map((tr, idx) => (
                    <div
                      key={tr.testCaseId || idx}
                      className={`p-3 rounded-lg border text-xs ${
                        tr.passed
                          ? 'border-emerald-500/20 bg-emerald-950/20'
                          : 'border-rose-500/30 bg-rose-950/20'
                      }`}
                    >
                      {/* Header of test case */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {tr.passed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                          )}
                          <span className="font-semibold text-zinc-200">
                            Test Case #{idx + 1}
                            {tr.hidden && (
                              <span className="ml-1.5 text-[10px] text-zinc-400 bg-zinc-800 px-1.5 py-0.2 rounded">
                                Test ẩn
                              </span>
                            )}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            tr.passed
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {tr.passed ? 'PASSED' : 'FAILED'}
                        </span>
                      </div>

                      {/* Details: Side-by-side comparison */}
                      <div className="font-mono text-[11px] bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-800 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-500 font-sans text-xs">Đầu vào (Input):</span>
                          <span className="text-zinc-200 font-semibold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-750">
                            {tr.hidden
                              ? '[Bảo mật / Test ẩn]'
                              : typeof tr.input === 'object' && tr.input !== null && !Array.isArray(tr.input)
                              ? formatVariableMap(tr.input)
                              : formatPythonValue(tr.input, false)}
                          </span>
                        </div>

                        {/* Side by side Expected vs Actual */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-zinc-850">
                          {/* Expected Column */}
                          <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800 space-y-1">
                            <div className="text-[10px] uppercase font-sans text-amber-400/80 font-bold tracking-wider">
                              Kỳ vọng (Expected)
                            </div>
                            <div className="text-amber-300 font-mono text-xs whitespace-pre-wrap">
                              {typeof tr.expected === 'object' && tr.expected !== null && !Array.isArray(tr.expected)
                                ? formatVariableMap(tr.expected)
                                : formatPythonValue(tr.expected, false)}
                            </div>
                          </div>

                          {/* Actual Column */}
                          <div
                            className={`p-2 rounded border space-y-1 ${
                              tr.passed
                                ? 'bg-emerald-500/10 border-emerald-500/30'
                                : 'bg-rose-500/10 border-rose-500/30'
                            }`}
                          >
                            <div
                              className={`text-[10px] uppercase font-sans font-bold tracking-wider ${
                                tr.passed ? 'text-emerald-400' : 'text-rose-400'
                              }`}
                            >
                              Thực tế (Actual)
                            </div>
                            <div
                              className={`font-mono text-xs whitespace-pre-wrap ${
                                tr.passed ? 'text-emerald-300' : 'text-rose-300 font-bold'
                              }`}
                            >
                              {typeof tr.actual === 'object' && tr.actual !== null && !Array.isArray(tr.actual)
                                ? formatVariableMap(tr.actual)
                                : formatPythonValue(tr.actual, false)}
                            </div>
                          </div>
                        </div>

                        {tr.error && (
                          <div className="pt-2 text-rose-400 font-sans border-t border-zinc-800/80 whitespace-pre-wrap text-xs">
                            <span className="font-bold">Lỗi phát sinh: </span>
                            {tr.error}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
