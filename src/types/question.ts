export type Difficulty = "Easy" | "Medium" | "Hard";

export type Category =
  | "Arrays"
  | "Strings"
  | "HashMap"
  | "TwoPointers"
  | "DP"
  | "Graphs"
  | "Trees"
  | "Math"
  | "Greedy"
  | "Backtracking";

export type Question = {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  category: Category;
  tags: string[];
  prompt: string;
  constraints: string[];
  examples: Array<{ input: string; output: string; explanation?: string }>;
  starterCode: { ts?: string; py?: string };
  defaultTests: TestCase[];
  createdAt: string;
};

export type TestCase = {
  id: string;
  name: string;
  input: string;
  expected: string;
  hidden?: boolean;
};
