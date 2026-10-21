import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Lesson } from '../types';

interface CelebrationModalProps {
  isOpen: boolean;
  lesson: Lesson;
  nextLesson?: Lesson | null;
  onNextLesson: () => void;
  onClose: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  lesson,
  nextLesson,
  onNextLesson,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Fire confetti fireworks
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-md bg-zinc-900 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Glow background */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative text-center space-y-4">
            {/* Trophy Icon */}
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Trophy className="w-8 h-8 text-emerald-400" />
            </div>

            {/* Title & description */}
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-zinc-100 flex items-center justify-center gap-1.5">
                Xuất Sắc Vượt Qua! <Sparkles className="w-5 h-5 text-amber-400" />
              </h3>
              <p className="text-xs text-zinc-400">
                Bạn đã hoàn thành trọn vẹn toàn bộ các ca kiểm thử của{' '}
                <strong className="text-emerald-400 font-semibold">{lesson.title}</strong>.
              </p>
            </div>

            {/* Concept learned */}
            <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800 text-left space-y-1">
              <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">
                Kiến thức cốt lõi đã nạp:
              </div>
              <div className="text-xs font-mono text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lesson.concept}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-2 px-3 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800 transition-colors"
              >
                Ở lại xem code
              </button>

              {nextLesson ? (
                <button
                  onClick={() => {
                    onClose();
                    onNextLesson();
                  }}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <span>Bài tiếp theo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-500/20"
                >
                  Hoàn thành lộ trình! 🎓
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
