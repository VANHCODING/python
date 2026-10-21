import React, { useState, useRef, useEffect, useCallback } from 'react';

interface SplitLayoutProps {
  left: React.ReactNode;
  editor: React.ReactNode;
  console: React.ReactNode;
}

export const SplitLayout: React.FC<SplitLayoutProps> = ({ left, editor, console }) => {
  // Horizontal split: percentage of left panel width (default 42%)
  const [leftWidthPercent, setLeftWidthPercent] = useState(42);
  // Vertical split: percentage of editor height (default 50% for comfortable console reading)
  const [editorHeightPercent, setEditorHeightPercent] = useState(50);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingHRef = useRef(false);
  const isDraggingVRef = useRef(false);

  const startDragH = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingHRef.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const startDragV = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingVRef.current = true;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingHRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newPercent = ((e.clientX - rect.left) / rect.width) * 100;
        if (newPercent >= 20 && newPercent <= 70) {
          setLeftWidthPercent(newPercent);
        }
      }

      if (isDraggingVRef.current && containerRef.current) {
        const rightContainer = containerRef.current.querySelector('.right-pane');
        if (rightContainer) {
          const rect = rightContainer.getBoundingClientRect();
          const newPercent = ((e.clientY - rect.top) / rect.height) * 100;
          if (newPercent >= 25 && newPercent <= 80) {
            setEditorHeightPercent(newPercent);
          }
        }
      }
    };

    const handleMouseUp = () => {
      if (isDraggingHRef.current || isDraggingVRef.current) {
        isDraggingHRef.current = false;
        isDraggingVRef.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
      {/* Left Pane (Theory & Problem) */}
      <div
        className="w-full md:h-full flex-shrink-0"
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

      {/* Right Pane (Workspace: Editor + Console) */}
      <div className="right-pane flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Editor Area */}
        <div
          className="w-full flex-shrink-0"
          style={{ height: `${editorHeightPercent}%` }}
        >
          {editor}
        </div>

        {/* Vertical Divider */}
        <div
          onMouseDown={startDragV}
          className="h-1.5 hover:h-2 bg-zinc-900 hover:bg-emerald-500/60 transition-all cursor-row-resize z-20 group relative flex items-center justify-center"
        >
          <div className="h-0.5 w-8 bg-zinc-700 group-hover:bg-emerald-300 rounded" />
        </div>

        {/* Console Area */}
        <div className="flex-1 min-h-0">
          {console}
        </div>
      </div>
    </div>
  );
};
