import React, { useEffect, useRef, useState } from 'react';
import Editor, { OnMount, BeforeMount } from '@monaco-editor/react';
import { Play, Send, Loader2, Sparkles, Download, Copy, Check } from 'lucide-react';

interface EditorPanelProps {
  code: string;
  lessonId: string;
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

  const isMac =
    typeof window !== 'undefined' &&
    (/Mac|iPod|iPhone|iPad/.test(navigator.platform || '') ||
      /Macintosh|Mac OS X/.test(navigator.userAgent || ''));

  const modKey = isMac ? '⌘' : 'Ctrl';
  const runShortcutBadge = `${modKey}+↵`;
  const runShortcutTitle = `Phím tắt: ${isMac ? 'Cmd + Enter' : 'Ctrl + Enter'}`;
  const submitShortcutTitle = `Phím tắt: ${isMac ? 'Cmd + Shift + Enter' : 'Ctrl + Shift + Enter'}`;

  const handleBeforeMount: BeforeMount = (monaco) => {
    monaco.editor.defineTheme('pymaster', {
      base: 'vs-dark',
      inherit: true,
      rules: [{ token: 'comment', foreground: '9CCFA8' }],
      colors: { 'editor.background': '#0b0f0e' },
    });
  };

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

      {/* Monaco Editor Container */}
      <div className="flex-1 min-h-0 relative">
        <Editor
          height="100%"
          language="python"
          theme="pymaster"
          value={code}
          onChange={(val) => onChange(val || '')}
          beforeMount={handleBeforeMount}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            fontLigatures: false,
            tabSize: 4,
            insertSpaces: true,
            detectIndentation: false,
            renderWhitespace: 'boundary',
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            padding: { top: 12, bottom: 12 },
            overviewRulerBorder: false,
            folding: true,
            wordWrap: 'on',
            guides: { indentation: true },
            ariaLabel: 'Trình soạn thảo mã Python',
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
