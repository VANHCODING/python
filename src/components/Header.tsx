import React from 'react';
import { Terminal, BookOpen, RotateCcw, CheckCircle2, ChevronRight, Menu } from 'lucide-react';
import { Lesson } from '../types';

interface HeaderProps {
  currentLesson: Lesson;
  totalLessons: number;
  completedCount: number;
  onResetCode: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentLesson,
  totalLessons,
  completedCount,
  onResetCode,
  onToggleSidebar,
  isSidebarOpen,
}) => {
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <header className="h-14 bg-zinc-950 border-b border-zinc-800/80 px-4 flex items-center justify-between select-none">
      {/* Left: Brand & Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className={`p-1.5 rounded-lg border transition-colors ${
            isSidebarOpen
              ? 'bg-zinc-800 text-emerald-400 border-zinc-700'
              : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
          }`}
          title="Mở mục lục bài học"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
            🐍
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-zinc-100">PyMaster</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                WASM
              </span>
            </div>
            <span className="text-[10px] text-zinc-400">Interactive Python Learning</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-xs text-zinc-400 ml-4 pl-4 border-l border-zinc-800">
          <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-zinc-500">Bài {currentLesson.order}:</span>
          <span className="font-medium text-zinc-200 truncate max-w-xs">{currentLesson.title}</span>
        </div>
      </div>

      {/* Right: Progress & Quick Actions */}
      <div className="flex items-center gap-4">
        {/* Progress Bar */}
        <div className="flex items-center gap-3 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800/80">
          <div className="flex flex-col items-end">
            <span className="text-[11px] font-medium text-zinc-300">
              Tiến độ: <strong className="text-emerald-400">{completedCount}</strong>/{totalLessons} bài
            </span>
            <div className="w-28 h-1.5 bg-zinc-800 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-emerald-500 transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            {progressPercent}%
          </span>
        </div>

        {/* Reset Code */}
        <button
          onClick={onResetCode}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-400 bg-zinc-900 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800 transition-colors"
          title="Khôi phục mã nguồn ban đầu của bài này"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Code</span>
        </button>
      </div>
    </header>
  );
};
