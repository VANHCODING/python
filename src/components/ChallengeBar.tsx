import React, { useState } from 'react';
import { Target, ChevronDown } from 'lucide-react';
import { Lesson } from '../types';
import { formatPythonValue } from '../utils/format';

interface ChallengeBarProps {
  lesson: Lesson;
}

export const ChallengeBar: React.FC<ChallengeBarProps> = ({ lesson }) => {
  const [open, setOpen] = useState(() => {
    try {
      return localStorage.getItem('pm:challenge-open') === '1';
    } catch {
      return false;
    }
  });

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('pm:challenge-open', next ? '1' : '0');
      } catch {}
      return next;
    });
  };

  const publicTests = lesson.testCases.filter((t) => !t.hidden);

  return (
    <section className="shrink-0 border-b border-zinc-800 bg-zinc-900/90 text-xs select-none">
      <button
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 px-4 py-2 text-left text-zinc-300 hover:bg-zinc-800/60 transition-colors"
      >
        <div className="flex items-center gap-2 truncate">
          <span className="flex items-center gap-1 font-semibold text-emerald-400 shrink-0">
            <Target className="w-3.5 h-3.5" />
            <span>Thử thách:</span>
          </span>
          <span className="truncate text-zinc-200 font-medium">{lesson.summary}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 text-xs text-zinc-400">
          <span>{open ? 'Thu gọn' : `Xem ${publicTests.length} test`}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {open && (
        <div className="max-h-[22vh] space-y-2 overflow-y-auto custom-scrollbar p-3 bg-zinc-950/85 border-t border-zinc-800/60">
          {lesson.targetFunction && (
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-zinc-400">Hàm cần định nghĩa:</span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                def {lesson.targetFunction}(...)
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-[11px]">
            {publicTests.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between gap-x-2 rounded bg-zinc-900/80 px-2.5 py-1.5 border border-zinc-800/60"
              >
                <span className="truncate text-zinc-300" title={t.description}>
                  {t.description}
                </span>
                <span className="text-amber-400 shrink-0 font-semibold">
                  {formatPythonValue(t.expected, false)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
