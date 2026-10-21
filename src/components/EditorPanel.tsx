import React, { useEffect, useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Play, Send, Loader2, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

interface EditorPanelProps {
  code: string;
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
        <div className="flex items-center gap-2">
          <button
            onClick={handleFormatCode}
            className="px-2.5 py-1 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded transition-colors"
            title="Định dạng thụt lề chuẩn"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {/* Run Code Button */}
          <button
            onClick={onRunCode}
            disabled={!isReady || isRunning || isTesting}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            title="Phím tắt: Ctrl + Enter"
          >
            {isRunning ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
            ) : (
              <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            )}
            <span>Chạy thử</span>
            <kbd className="hidden sm:inline text-[9px] text-zinc-400 font-mono bg-zinc-900 px-1 rounded">
              Ctrl+↵
            </kbd>
          </button>

          {/* Submit & Auto-Grade Button */}
          <button
            onClick={onSubmitTest}
            disabled={!isReady || isRunning || isTesting}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            title="Phím tắt: Ctrl + Shift + Enter"
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
          theme="vs-dark"
          value={code}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 13.5,
            fontFamily: '"JetBrains Mono", "Fira Code", Consolas, monospace',
            fontLigatures: true,
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
