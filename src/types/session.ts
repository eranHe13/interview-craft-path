export type StageKey = "understand" | "idea" | "code" | "analysis";

export type Session = {
  id: string;
  questionId: string;
  status: "in_progress" | "completed";
  startedAt: string;
  completedAt?: string;
  timeByStage: Record<StageKey, number>;
  attempts: number;
  usedHints: number;
  currentStage: StageKey;
  artifacts: {
    understand?: {
      keyPoints: string[];
      edgeCases: string[];
      restatement: string;
    };
    idea?: {
      approach: string;
      dataStructures: string[];
      complexity: { time: string; space: string };
      pseudocode: string;
    };
    code?: {
      language: "ts" | "py";
      source: string;
      tests: TestCase[];
      runResult?: RunResult;
    };
    analysis?: {
      summary: string;
      lessons: string[];
      revisedComplexity?: { time: string; space: string };
    };
  };
};

export type TestCase = {
  id: string;
  name: string;
  input: string;
  expected: string;
  hidden?: boolean;
};

export type RunResult = {
  passed: number;
  failed: number;
  totalTime: number;
  cases: Array<{
    id: string;
    name: string;
    input: string;
    expected: string;
    actual: string;
    pass: boolean;
    stderr?: string;
    time?: number;
  }>;
};
