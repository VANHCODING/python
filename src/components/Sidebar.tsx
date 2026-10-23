import React, { useState } from 'react';
import { Module, Lesson } from '../types';
import {
  CheckCircle2,
  Circle,
  PlayCircle,
  ChevronDown,
  ChevronRight,
  BookMarked,
  X,
  Layers,
  Code2,
  GitFork,
  Box,
  Repeat,
  Sparkles,
  ShieldAlert,
  Cpu,
} from 'lucide-react';

interface SidebarProps {
  modules: Module[];
  currentLessonId: string;
  completedLessonIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lesson: Lesson) => void;
}

const iconMap: Record<string, any> = {
  Box: Box,
  GitFork: GitFork,
  Repeat: Repeat,
  Layers: Layers,
  Code2: Code2,
  Sparkles: Sparkles,
  ShieldAlert: ShieldAlert,
  Cpu: Cpu,
};

export const Sidebar: React.FC<SidebarProps> = ({
  modules,
  currentLessonId,
  completedLessonIds,
  isOpen,
  onClose,
  onSelectLesson,
}) => {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    // Default open all modules
    const initial: Record<string, boolean> = {};
    modules.forEach((m) => {
      initial[m.id] = true;
    });
    return initial;
  });

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  if (!isOpen) return null;

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-80 bg-zinc-950 border-r border-zinc-800/80 shadow-2xl flex flex-col h-full pt-14 md:relative md:pt-0 md:h-full overflow-hidden flex-shrink-0 select-none">
      {/* Top Header */}
      <div className="p-3.5 border-b border-zinc-800/80 flex items-center justify-between flex-shrink-0 bg-zinc-950">
        <div className="flex items-center gap-2">
          <BookMarked className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-zinc-100 tracking-tight">Mục lục lộ trình</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Module & Lesson List - Independent scroll container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar overscroll-contain">
        {modules.map((mod) => {
          const IconComponent = iconMap[mod.icon] || Box;
          const isExpanded = !!expandedModules[mod.id];
          const completedInMod = mod.lessons.filter((l) =>
            completedLessonIds.includes(l.id)
          ).length;

          return (
            <div key={mod.id} className="rounded-xl border border-zinc-850/60 bg-zinc-900/40 overflow-hidden">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-zinc-850/60 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 flex-shrink-0">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-semibold text-zinc-200 truncate">{mod.title}</div>
                    <div className="text-[10px] text-zinc-500">
                      {completedInMod}/{mod.lessons.length} bài đã hoàn thành
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-zinc-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                )}
              </button>

              {/* Lessons list */}
              {isExpanded && (
                <div className="p-1.5 pt-0 space-y-1 border-t border-zinc-800/40">
                  {mod.lessons.map((lesson) => {
                    const isCompleted = completedLessonIds.includes(lesson.id);
                    const isCurrent = lesson.id === currentLessonId;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          onSelectLesson(lesson);
                          if (window.innerWidth < 768) {
                            onClose();
                          }
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-all ${
                          isCurrent
                            ? 'bg-emerald-500/15 text-emerald-300 font-medium border border-emerald-500/30 shadow-sm'
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        ) : isCurrent ? (
                          <PlayCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 animate-pulse" />
                        ) : (
                          <Circle className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                        )}
                        <span className="truncate">{lesson.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
