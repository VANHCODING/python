import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CURRICULUM } from './data/curriculum';
import { Lesson, UserProgress } from './types';
import { usePyodide } from './hooks/usePyodide';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ProblemPanel } from './components/ProblemPanel';
import { EditorPanel } from './components/EditorPanel';
import { ConsolePanel } from './components/ConsolePanel';
import { SplitLayout } from './components/SplitLayout';
import { CelebrationModal } from './components/CelebrationModal';
import { ResetModal } from './components/ResetModal';
import { playSuccessChime } from './utils/sound';

const STORAGE_KEY = 'pymaster_progress_v1';

export function App() {
  // Flatten all lessons into a single list
  const allLessons = useMemo(() => {
    return CURRICULUM.flatMap((m) => m.lessons);
  }, []);

  // Initialize progress from localStorage
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load progress from localStorage', e);
    }
    return {
      completedLessonIds: [],
      savedCode: {},
      currentLessonId: allLessons[0]?.id || 'lesson-1',
      theme: 'dark',
    };
  });

  // Current Lesson state
  const currentLesson = useMemo(() => {
    return allLessons.find((l) => l.id === progress.currentLessonId) || allLessons[0];
  }, [allLessons, progress.currentLessonId]);

  // Current Code in Editor
  const [code, setCode] = useState<string>(() => {
    return progress.savedCode[currentLesson.id] || currentLesson.starterCode;
  });

  // Sync editor code when lesson changes
  useEffect(() => {
    const saved = progress.savedCode[currentLesson.id];
    setCode(saved !== undefined ? saved : currentLesson.starterCode);
  }, [currentLesson.id]);

  // Save progress to localStorage
  const saveProgress = useCallback((newProgress: Partial<UserProgress>) => {
    setProgress((prev) => {
      const updated = { ...prev, ...newProgress };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save to localStorage', e);
      }
      return updated;
    });
  }, []);

  // Handle code change and persist
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    saveProgress({
      savedCode: {
        ...progress.savedCode,
        [currentLesson.id]: newCode,
      },
    });
  };

  // Reset code modal state
  const [showResetModal, setShowResetModal] = useState(false);

  // Open reset confirmation modal
  const handleResetCode = () => {
    setShowResetModal(true);
  };

  // Perform actual reset after confirmation
  const handleConfirmReset = () => {
    const defaultCode = currentLesson.starterCode;
    setCode(defaultCode);
    saveProgress({
      savedCode: {
        ...progress.savedCode,
        [currentLesson.id]: defaultCode,
      },
    });
  };

  // Pyodide Runner Hook
  const {
    isReady,
    isLoading,
    loadingStage,
    isRunning,
    isTesting,
    lastExecution,
    testResults,
    testSummary,
    runCode,
    runTests,
    resetOutputs,
  } = usePyodide();

  // Console active tab state
  const [consoleTab, setConsoleTab] = useState<'terminal' | 'tests'>('terminal');

  // Sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Celebration Modal state
  const [showCelebration, setShowCelebration] = useState(false);

  // Trigger Run Code
  const handleRunCode = () => {
    setConsoleTab('terminal');
    runCode(code);
  };

  // Trigger Submit & Auto-Grade
  const handleSubmitTest = () => {
    setConsoleTab('tests');
    runTests(code, currentLesson.testCases, currentLesson.targetFunction);
  };

  // Previous and next lesson navigation
  const currentIndex = useMemo(() => {
    return allLessons.findIndex((l) => l.id === currentLesson.id);
  }, [allLessons, currentLesson.id]);

  const prevLesson = useMemo(() => {
    if (currentIndex > 0) {
      return allLessons[currentIndex - 1];
    }
    return null;
  }, [allLessons, currentIndex]);

  const nextLesson = useMemo(() => {
    if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
      return allLessons[currentIndex + 1];
    }
    return null;
  }, [allLessons, currentIndex]);

  // Select lesson from sidebar or modal
  const handleSelectLesson = (lesson: Lesson) => {
    resetOutputs();
    saveProgress({ currentLessonId: lesson.id });
    setIsSidebarOpen(false);
  };

  const handlePrevLesson = () => {
    if (prevLesson) {
      handleSelectLesson(prevLesson);
    }
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      handleSelectLesson(nextLesson);
    }
  };

  // Check for 100% test pass to trigger celebration & audio chime
  useEffect(() => {
    if (testSummary && testSummary.allPassed) {
      playSuccessChime();
      if (!progress.completedLessonIds.includes(currentLesson.id)) {
        const nextCompleted = [...progress.completedLessonIds, currentLesson.id];
        saveProgress({ completedLessonIds: nextCompleted });
      }
      setShowCelebration(true);
    }
  }, [testSummary, currentLesson.id]);

  return (
    <div className="h-screen w-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      {/* Top Header */}
      <Header
        currentLesson={currentLesson}
        totalLessons={allLessons.length}
        completedCount={progress.completedLessonIds.length}
        onResetCode={handleResetCode}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Workspace with Sidebar & Split Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar
          modules={CURRICULUM}
          currentLessonId={currentLesson.id}
          completedLessonIds={progress.completedLessonIds}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onSelectLesson={handleSelectLesson}
        />

        <SplitLayout
          left={
            <ProblemPanel
              lesson={currentLesson}
              isCompleted={progress.completedLessonIds.includes(currentLesson.id)}
              onPrevLesson={handlePrevLesson}
              onNextLesson={handleNextLesson}
              hasPrev={!!prevLesson}
              hasNext={!!nextLesson}
            />
          }
          editor={
            <EditorPanel
              code={code}
              lessonId={currentLesson.id}
              onChange={handleCodeChange}
              onRunCode={handleRunCode}
              onSubmitTest={handleSubmitTest}
              isReady={isReady}
              isLoading={isLoading}
              loadingStage={loadingStage}
              isRunning={isRunning}
              isTesting={isTesting}
            />
          }
          console={
            <ConsolePanel
              execution={lastExecution}
              testResults={testResults}
              testSummary={testSummary}
              activeTab={consoleTab}
              onTabChange={setConsoleTab}
              onClear={resetOutputs}
              isRunning={isRunning}
              isTesting={isTesting}
            />
          }
        />
      </div>

      {/* Confirmation Modal before resetting student code */}
      <ResetModal
        isOpen={showResetModal}
        onConfirm={handleConfirmReset}
        onClose={() => setShowResetModal(false)}
      />

      {/* Celebration Modal when all tests pass */}
      <CelebrationModal
        isOpen={showCelebration}
        lesson={currentLesson}
        nextLesson={nextLesson}
        onNextLesson={handleNextLesson}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  );
}
export default App;
