import React, { useState, useRef, useEffect, useCallback } from 'react';

interface SplitLayoutProps {
  left: React.ReactNode;
  challengeBar?: React.ReactNode;
  editor: React.ReactNode;
  console: React.ReactNode;
}

export const SplitLayout: React.FC<SplitLayoutProps> = ({ left, challengeBar, editor, console }) => {
  // Horizontal split: percentage of left panel width (default 42%)
  const [leftWidthPercent, setLeftWidthPercent] = useState(42);
  // Vertical split: percentage of editor height (default 65% for spacious editor)
  const [editorHeightPercent, setEditorHeightPercent] = useState(65);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingHRef = useRef(false);
  const isDraggingVRef = useRef(false);

  const startDragH = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingHRef.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMove = (moveEvent: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newPercent = ((moveEvent.clientX - rect.left) / rect.width) * 100;
        if (newPercent >= 20 && newPercent <= 70) {
          setLeftWidthPercent(newPercent);
        }
      }
    };

    const onUp = () => {
      isDraggingHRef.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, []);

  const startDragV = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingVRef.current = true;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';

    const onMove = (moveEvent: MouseEvent) => {
      if (containerRef.current) {
        const rightContainer = containerRef.current.querySelector('.right-pane');
        if (rightContainer) {
          const rect = rightContainer.getBoundingClientRect();
          const newPercent = ((moveEvent.clientY - rect.top) / rect.height) * 100;
          if (newPercent >= 25 && newPercent <= 80) {
            setEditorHeightPercent(newPercent);
          }
        }
      }
    };

    const onUp = () => {
      isDraggingVRef.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, []);

  return (
    <div ref={containerRef} className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
      {/* Left Pane (Theory & Problem) */}
      <div
        className="w-full md:h-full flex-shrink-0 overflow-hidden"
        style={{
          width: window.innerWidth >= 768 ? `${leftWidthPercent}%` : '100%',
          height: window.innerWidth < 768 ? '45vh' : '100%',
        }}
      >
        {left}
      </div>

      {/* Horizontal Divider (visible on desktop) */}
      <div
        onMouseDown={startDragH}
        className="hidden md:flex items-center justify-center w-1.5 hover:w-2 bg-zinc-900 hover:bg-emerald-500/60 transition-all cursor-col-resize z-20 group relative"
      >
        <div className="w-0.5 h-8 bg-zinc-700 group-hover:bg-emerald-300 rounded" />
      </div>

      {/* Right Pane (Workspace: ChallengeBar + Editor + Console) */}
      <div className="right-pane flex-1 flex flex-col h-full min-h-0 overflow-hidden min-w-0">
        {challengeBar}

        {/* Editor Area with guaranteed min-height */}
        <div
          className="w-full min-h-[220px] flex-1 flex flex-col overflow-hidden"
          style={{ height: `${editorHeightPercent}%` }}
        >
          {editor}
        </div>

        {/* Vertical Divider */}
        <div
          onMouseDown={startDragV}
          className="h-1.5 hover:h-2 bg-zinc-900 hover:bg-emerald-500/60 transition-all cursor-row-resize z-20 group relative flex items-center justify-center flex-shrink-0"
        >
          <div className="h-0.5 w-10 bg-zinc-700 group-hover:bg-emerald-300 rounded" />
        </div>

        {/* Console Area with clamped height so it never crunches editor */}
        <div
          className="w-full shrink-0 overflow-hidden flex flex-col"
          style={{ height: `clamp(130px, ${100 - editorHeightPercent}%, 280px)` }}
        >
          {console}
        </div>
      </div>
    </div>
  );
};
