export type TestType = 'function' | 'stdout' | 'variable';

export interface TestCase {
  id: string;
  description: string;
  input?: any; // arguments for function calls or scenario description
  variable?: string; // variable name if type is single variable
  mockVariables?: Record<string, any>; // mock inputs to inject into script (replaces starter initializations)
  expectedVariables?: Record<string, any>; // multiple variables to check in this scenario
  expected: any; // expected return value, string output, or variable value
  type: TestType;
  hidden?: boolean;
}

export interface TestResult {
  testCaseId: string;
  description: string;
  passed: boolean;
  input: any;
  expected: any;
  actual: any;
  error?: string;
  hidden?: boolean;
  executionTimeMs?: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  order: number;
  title: string;
  summary: string;
  concept: string; // The deep pedagogical concept (e.g. "Name Binding", "Truthy/Falsy")
  theoryMarkdown: string;
  targetFunction?: string; // e.g. "calculate_bmi", if function-based
  starterCode: string;
  solutionCode: string;
  hints: string[];
  testCases: TestCase[];
}

export interface Module {
  id: string;
  order: number;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}

export interface ExecutionResult {
  success: boolean;
  stdout: string;
  stderr: string;
  result?: any;
  error?: string;
  executionTimeMs: number;
}

export interface UserProgress {
  completedLessonIds: string[];
  savedCode: Record<string, string>;
  currentLessonId: string;
  theme: 'dark' | 'light';
}

export type WorkerMessage =
  | { type: 'READY' }
  | { type: 'LOADING'; stage: string }
  | { type: 'RUN_SUCCESS'; data: ExecutionResult }
  | { type: 'RUN_ERROR'; error: string; stdout: string; stderr: string }
  | { type: 'TESTS_COMPLETE'; results: TestResult[]; summary: { total: number; passed: number; allPassed: boolean } }
  | { type: 'TESTS_ERROR'; error: string; stdout: string };

export type WorkerCommand =
  | { type: 'INIT' }
  | { type: 'RUN_CODE'; code: string }
  | { type: 'RUN_TESTS'; code: string; testCases: TestCase[]; targetFunction?: string };
