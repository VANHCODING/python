import React, { useEffect, useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Play, Send, Loader2, Sparkles, Download, Copy, Check, Target, ChevronDown } from 'lucide-react';
import { Lesson } from '../types';
import { formatPythonValue } from '../utils/format';

interface EditorPanelProps {
  code: string;
  lessonId: string;
  lesson?: Lesson;
  onChange: (value: string) => void;
  onRunCode: () => void;
  onSubmitTest: () => void;
  isReady: boolean;
  isLoading: boolean;
  loadingStage: string;
  isRunning: boolean;
  isTesting: boolean;
  onFormatCode?: () => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  code,
  lessonId,
  lesson,
  onChange,
  onRunCode,
  onSubmitTest,
  isReady,
  isLoading,
  loadingStage,
  isRunning,
  isTesting,
}) => {
  const editorRef = useRef<any>(null);
  const [copied, setCopied] = useState(false);
  const [showChallengePin, setShowChallengePin] = useState(true);

  const isMac =
    typeof window !== 'undefined' &&
    (/Mac|iPod|iPhone|iPad/.test(navigator.platform || '') ||
      /Macintosh|Mac OS X/.test(navigator.userAgent || ''));

  const modKey = isMac ? '⌘' : 'Ctrl';
  const runShortcutBadge = `${modKey}+↵`;
  const runShortcutTitle = `Phím tắt: ${isMac ? 'Cmd + Enter' : 'Ctrl + Enter'}`;
  const submitShortcutTitle = `Phím tắt: ${isMac ? 'Cmd + Shift + Enter' : 'Ctrl + Shift + Enter'}`;

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Register hotkeys: Ctrl+Enter to Run, Ctrl+Shift+Enter to Submit
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRunCode();
    });

    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
      () => {
        onSubmitTest();
      }
    );
  };

  const handleFormatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${lessonId || 'solution'}.py`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-zinc-950">
      {/* Top Action Bar */}
      <div className="h-10 bg-zinc-900/60 border-b border-zinc-800/80 px-3 flex items-center justify-between">
        {/* Left: Engine Status indicator */}
        <div className="flex items-center gap-2">
          {isLoading ? (
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>{loadingStage || 'Đang tải Python Engine...'}</span>
            </div>
          ) : isReady ? (
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
              <span>CPython 3.12 (Web Worker)</span>
            </div>
          ) : (
            <span className="text-xs text-zinc-500">Chưa sẵn sàng</span>
          )}
        </div>

        {/* Right: Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Copy Code */}
          <button
            onClick={handleCopyCode}
            className="p-1.5 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
            title="Sao chép toàn bộ mã nguồn vào clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Download .py */}
          <button
            onClick={handleDownload}
            className="p-1.5 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
            title="Tải file .py về máy tính"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Format Code */}
          <button
            onClick={handleFormatCode}
            className="p-1.5 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
            title="Tự động căn chỉnh thụt lề chuẩn PEP 8"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-zinc-800 mx-1" />

          {/* Run Code Button */}
          <button
            onClick={onRunCode}
            disabled={!isReady || isRunning || isTesting}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            title={runShortcutTitle}
          >
            {isRunning ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
            ) : (
              <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            )}
            <span>Chạy thử</span>
            <kbd className="hidden sm:inline text-[9px] text-zinc-400 font-mono bg-zinc-900 px-1 rounded">
              {runShortcutBadge}
            </kbd>
          </button>

          {/* Submit & Auto-Grade Button */}
          <button
            onClick={onSubmitTest}
            disabled={!isReady || isRunning || isTesting}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            title={submitShortcutTitle}
          >
            {isTesting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-950" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Nộp bài & Chấm</span>
          </button>
        </div>
      </div>

      {/* Pinned Challenge Requirement Bar above Editor */}
      {lesson && (
        <div className="bg-zinc-900/95 border-b border-zinc-800 text-xs select-none">
          <div
            onClick={() => setShowChallengePin(!showChallengePin)}
            className="px-3 py-1.5 flex items-center justify-between cursor-pointer hover:bg-zinc-800/60 transition-colors text-zinc-300"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="flex items-center gap-1 font-semibold text-emerald-400 flex-shrink-0">
                <Target className="w-3.5 h-3.5" />
                <span>Thử thách:</span>
              </span>
              <span className="truncate text-zinc-200 font-medium">{lesson.summary}</span>
            </div>
            <button
              className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200 flex-shrink-0 ml-2"
              title="Đóng / mở chi tiết đề bài"
            >
              <span>{showChallengePin ? 'Thu gọn' : 'Xem đề'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${showChallengePin ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {showChallengePin && (
            <div className="p-3 bg-zinc-950/90 border-t border-zinc-800/60 space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
              <p className="text-zinc-300 leading-relaxed font-sans">{lesson.summary}</p>
              {lesson.targetFunction && (
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-zinc-400">Hàm cần định nghĩa:</span>
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    def {lesson.targetFunction}(...)
                  </span>
                </div>
              )}
              {lesson.testCases.filter((t) => !t.hidden).length > 0 && (
                <div className="space-y-1 font-mono text-[11px] pt-1">
                  <span className="text-zinc-500">Mục tiêu kiểm thử mẫu:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {lesson.testCases
                      .filter((t) => !t.hidden)
                      .slice(0, 4)
                      .map((tc, idx) => (
                        <div
                          key={idx}
                          className="text-zinc-400 bg-zinc-900/60 p-1.5 rounded border border-zinc-800/60 flex items-center justify-between"
                        >
                          <span className="text-zinc-300 truncate max-w-[200px]" title={tc.description}>
                            {tc.description}
                          </span>
                          <span className="text-amber-400 font-semibold ml-2">
                            {formatPythonValue(tc.expected, false)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Monaco Editor Container */}
      <div className="flex-1 min-h-0 relative">
        <Editor
          height="100%"
          language="python"
          theme="vs-dark"
          value={code}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 13.5,
            fontFamily: '"JetBrains Mono", "Fira Code", Consolas, monospace',
            fontLigatures: false,
            tabSize: 4,
            insertSpaces: true,
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            renderWhitespace: 'selection',
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            padding: { top: 8, bottom: 8 },
            overviewRulerBorder: false,
            folding: true,
            wordWrap: 'on',
          }}
          loading={
            <div className="flex flex-col items-center justify-center h-full gap-2 text-zinc-400 text-xs">
              <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
              <span>Đang tải Editor...</span>
            </div>
          }
        />
      </div>
    </div>
  );
};
