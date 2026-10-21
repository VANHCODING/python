import React, { useState } from 'react';
import { Lesson } from '../types';
import {
  BookOpen,
  Target,
  Lightbulb,
  Code,
  ChevronDown,
  ChevronRight,
  Eye,
  CheckCircle2,
  Copy,
  Check,
  ChevronLeft
} from 'lucide-react';

interface ProblemPanelProps {
  lesson: Lesson;
  isCompleted: boolean;
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const ProblemPanel: React.FC<ProblemPanelProps> = ({
  lesson,
  isCompleted,
  onPrevLesson,
  onNextLesson,
  hasPrev,
  hasNext,
}) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'problem' | 'hints'>('theory');
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);

  const toggleHint = (index: number) => {
    if (revealedHints.includes(index)) {
      setRevealedHints(revealedHints.filter((i) => i !== index));
    } else {
      setRevealedHints([...revealedHints, index]);
    }
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  // Helper to parse inline bold (**text**) and code (`text`) inside paragraphs
  const renderInline = (text: string) => {
    // Regex splits by code blocks `...` and bold **...**
    const parts = text.split(/(\`[^\`]+\`|\*\*[^\*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={i}
            className="bg-zinc-800 text-emerald-300 px-1.5 py-0.5 rounded text-[11px] font-mono font-medium border border-zinc-750"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-zinc-100">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // Helper to render markdown content with support for code blocks, tables, bold, blockquotes
  const renderSimpleMarkdown = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];
    let codeLang = '';
    let inTable = false;
    let tableBuffer: string[] = [];

    const flushTable = () => {
      if (tableBuffer.length === 0) return;
      const rows = tableBuffer.map((r) =>
        r
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim())
      );
      if (rows.length >= 2) {
        const headers = rows[0];
        const dataRows = rows.slice(2);
        elements.push(
          <div key={`table-${elements.length}`} className="overflow-x-auto my-3 border border-zinc-800 rounded-lg">
            <table className="w-full text-xs text-left text-zinc-300">
              <thead className="bg-zinc-900/90 text-zinc-200">
                <tr>
                  {headers.map((h, hi) => (
                    <th key={hi} className="p-2.5 border-b border-zinc-800 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 bg-zinc-950/60">
                {dataRows.map((dr, ri) => (
                  <tr key={ri} className="hover:bg-zinc-900/40">
                    {dr.map((c, ci) => (
                      <td key={ci} className="p-2.5">
                        {renderInline(c)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      tableBuffer = [];
      inTable = false;
    };

    lines.forEach((line, idx) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          const rawCode = codeBuffer.join('\n');
          const isCopied = copiedCodeIdx === idx;
          elements.push(
            <div key={`code-${idx}`} className="my-3 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900/90 group">
              <div className="px-3 py-1.5 bg-zinc-900 text-[10px] text-zinc-400 font-mono border-b border-zinc-800 flex items-center justify-between">
                <span>{codeLang || 'python'}</span>
                <button
                  onClick={() => copyToClipboard(rawCode, idx)}
                  className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-zinc-200 px-1.5 py-0.5 rounded hover:bg-zinc-800 transition-colors"
                  title="Sao chép mã"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 text-xs font-mono text-emerald-300 overflow-x-auto">
                <code>{rawCode}</code>
              </pre>
            </div>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          if (inTable) flushTable();
          inCodeBlock = true;
          codeLang = line.replace('```', '').trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        inTable = true;
        tableBuffer.push(line.trim());
        return;
      } else if (inTable) {
        flushTable();
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={idx} className="text-base font-bold text-zinc-100 mt-4 mb-2 flex items-center gap-2">
            {renderInline(line.replace('### ', ''))}
          </h3>
        );
      } else if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={idx} className="text-sm font-semibold text-zinc-200 mt-3 mb-1.5">
            {renderInline(line.replace('#### ', ''))}
          </h4>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote
            key={idx}
            className="border-l-2 border-emerald-500 bg-emerald-500/10 px-3.5 py-2 rounded-r-lg text-xs text-zinc-300 my-2.5"
          >
            {renderInline(line.replace('> ', ''))}
          </blockquote>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={idx} className="text-xs text-zinc-300 ml-4 list-disc mb-1 leading-relaxed">
            {renderInline(line.replace('- ', ''))}
          </li>
        );
      } else if (line.trim() !== '') {
        elements.push(
          <p key={idx} className="text-xs text-zinc-300 leading-relaxed mb-2.5">
            {renderInline(line)}
          </p>
        );
      }
    });

    if (inTable) flushTable();

    return elements;
  };

  return (
    <div className="h-full flex flex-col bg-zinc-950 border-r border-zinc-800/80">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950 px-3 pt-2">
        <div className="flex items-center">
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'theory'
                ? 'border-emerald-500 text-emerald-400 bg-zinc-900/40 rounded-t-lg'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Lý Thuyết Bản Chất</span>
          </button>

          <button
            onClick={() => setActiveTab('problem')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'problem'
                ? 'border-emerald-500 text-emerald-400 bg-zinc-900/40 rounded-t-lg'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Thử Thách</span>
            {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
          </button>

          <button
            onClick={() => setActiveTab('hints')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'hints'
                ? 'border-emerald-500 text-emerald-400 bg-zinc-900/40 rounded-t-lg'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Gợi Ý ({lesson.hints.length})</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: THEORY */}
        {activeTab === 'theory' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 border border-zinc-700">
                {lesson.concept}
              </span>
            </div>
            <div className="prose-custom">{renderSimpleMarkdown(lesson.theoryMarkdown)}</div>
          </div>
        )}

        {/* TAB 2: PROBLEM */}
        {activeTab === 'problem' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-2">
              <div className="text-xs text-zinc-400">Yêu cầu thử thách:</div>
              <h2 className="text-sm font-semibold text-zinc-100">{lesson.summary}</h2>
              {lesson.targetFunction && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs text-zinc-400">Tên hàm cần định nghĩa:</span>
                  <code className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    def {lesson.targetFunction}(...)
                  </code>
                </div>
              )}
            </div>

            {/* Public Test Case Examples */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-emerald-400" />
                Ví dụ mẫu (Example Test Cases)
              </h4>

              {lesson.testCases
                .filter((tc) => !tc.hidden)
                .map((tc, idx) => (
                  <div key={tc.id} className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/30 space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-zinc-400 font-sans">
                      <span className="font-semibold text-zinc-300">Ví dụ {idx + 1}:</span>
                      <span className="text-[11px] text-zinc-500">{tc.description}</span>
                    </div>
                    <div className="bg-zinc-950 p-2.5 rounded border border-zinc-800/80 space-y-1">
                      <div>
                        <span className="text-zinc-500">Kiểm tra: </span>
                        <span className="text-emerald-300">
                          {tc.type === 'variable'
                            ? `Giá trị biến: ${tc.variable}`
                            : tc.type === 'stdout'
                            ? 'Đầu ra màn hình (print)'
                            : lesson.targetFunction
                            ? `${lesson.targetFunction}(${(tc.input || []).map((v) => JSON.stringify(v)).join(', ')})`
                            : JSON.stringify(tc.input)}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-500">Kỳ vọng (Expected): </span>
                        <span className="text-amber-300">{JSON.stringify(tc.expected)}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 3: HINTS */}
        {activeTab === 'hints' && (
          <div className="space-y-3">
            <p className="text-xs text-zinc-400">
              Bạn gặp khó khăn khi làm bài? Hãy mở lần lượt từng gợi ý dưới đây trước khi xem đáp án mẫu nhé:
            </p>

            {lesson.hints.map((hint, idx) => {
              const isRevealed = revealedHints.includes(idx);
              return (
                <div key={idx} className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/30">
                  <button
                    onClick={() => toggleHint(idx)}
                    className="w-full p-3 flex items-center justify-between text-left hover:bg-zinc-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Lightbulb className={`w-4 h-4 ${isRevealed ? 'text-amber-400' : 'text-zinc-500'}`} />
                      <span className="text-xs font-medium text-zinc-200">Gợi ý #{idx + 1}</span>
                    </div>
                    {isRevealed ? (
                      <ChevronDown className="w-4 h-4 text-zinc-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-zinc-500" />
                    )}
                  </button>
                  {isRevealed && (
                    <div className="p-3 pt-0 text-xs text-zinc-300 border-t border-zinc-800/50 bg-zinc-950/40">
                      {renderInline(hint)}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Solution Reveal */}
            <div className="pt-4 border-t border-zinc-800">
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showSolution ? 'Ẩn code giải mẫu' : 'Xem code giải mẫu (Tham khảo)'}</span>
              </button>

              {showSolution && (
                <div className="mt-2.5 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 space-y-2">
                  <div className="text-[11px] text-amber-300 font-medium">💡 Mã nguồn mẫu tham khảo:</div>
                  <pre className="text-xs font-mono text-emerald-300 bg-zinc-950 p-2.5 rounded border border-zinc-800 overflow-x-auto">
                    <code>{lesson.solutionCode}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Lesson Navigation Bar */}
      <div className="p-2.5 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between">
        <button
          onClick={onPrevLesson}
          disabled={!hasPrev}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed border border-zinc-800 transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Bài trước</span>
        </button>

        <button
          onClick={onNextLesson}
          disabled={!hasNext}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed border border-emerald-500/20 transition-colors"
        >
          <span>Bài kế tiếp</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
