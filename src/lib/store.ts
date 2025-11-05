import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Question } from "@/types/question";
import { Session, StageKey, RunResult } from "@/types/session";
import { allQuestions } from "@/data/questions";

interface AppStore {
  questions: Question[];
  sessions: Session[];
  currentSessionId: string | null;
  pinnedQuestions: string[];
  
  // Actions
  loadMockData: () => void;
  createSession: (questionId: string) => string;
  updateStage: (stageKey: StageKey, payload: any) => void;
  setCurrentSession: (sessionId: string | null) => void;
  finishSession: () => void;
  pinQuestion: (questionId: string) => void;
  unpinQuestion: (questionId: string) => void;
  runTests: (runResult: RunResult) => void;
  updateSessionTime: (stageKey: StageKey, seconds: number) => void;
  useHint: () => void;
  getCurrentSession: () => Session | null;
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      questions: [],
      sessions: [],
      currentSessionId: null,
      pinnedQuestions: [],

      loadMockData: () => {
        set({ questions: allQuestions });
      },

      createSession: (questionId: string) => {
        const newSession: Session = {
          id: `session-${Date.now()}`,
          questionId,
          status: "in_progress",
          startedAt: new Date().toISOString(),
          timeByStage: {
            understand: 0,
            idea: 0,
            code: 0,
            analysis: 0,
          },
          attempts: 1,
          usedHints: 0,
          currentStage: "understand",
          artifacts: {},
        };

        set((state) => ({
          sessions: [...state.sessions, newSession],
          currentSessionId: newSession.id,
        }));

        return newSession.id;
      },

      updateStage: (stageKey: StageKey, payload: any) => {
        set((state) => {
          const sessions = state.sessions.map((session) => {
            if (session.id === state.currentSessionId) {
              return {
                ...session,
                artifacts: {
                  ...session.artifacts,
                  [stageKey]: payload,
                },
              };
            }
            return session;
          });
          return { sessions };
        });
      },

      setCurrentSession: (sessionId: string | null) => {
        set({ currentSessionId: sessionId });
      },

      finishSession: () => {
        set((state) => {
          const sessions = state.sessions.map((session) => {
            if (session.id === state.currentSessionId) {
              return {
                ...session,
                status: "completed" as const,
                completedAt: new Date().toISOString(),
              };
            }
            return session;
          });
          return { sessions, currentSessionId: null };
        });
      },

      pinQuestion: (questionId: string) => {
        set((state) => ({
          pinnedQuestions: [...state.pinnedQuestions, questionId],
        }));
      },

      unpinQuestion: (questionId: string) => {
        set((state) => ({
          pinnedQuestions: state.pinnedQuestions.filter((id) => id !== questionId),
        }));
      },

      runTests: (runResult: RunResult) => {
        set((state) => {
          const sessions = state.sessions.map((session) => {
            if (session.id === state.currentSessionId) {
              return {
                ...session,
                artifacts: {
                  ...session.artifacts,
                  code: {
                    ...session.artifacts.code!,
                    runResult,
                  },
                },
              };
            }
            return session;
          });
          return { sessions };
        });
      },

      updateSessionTime: (stageKey: StageKey, seconds: number) => {
        set((state) => {
          const sessions = state.sessions.map((session) => {
            if (session.id === state.currentSessionId) {
              return {
                ...session,
                timeByStage: {
                  ...session.timeByStage,
                  [stageKey]: session.timeByStage[stageKey] + seconds,
                },
              };
            }
            return session;
          });
          return { sessions };
        });
      },

      useHint: () => {
        set((state) => {
          const sessions = state.sessions.map((session) => {
            if (session.id === state.currentSessionId) {
              return {
                ...session,
                usedHints: session.usedHints + 1,
              };
            }
            return session;
          });
          return { sessions };
        });
      },

      getCurrentSession: () => {
        const state = get();
        return state.sessions.find((s) => s.id === state.currentSessionId) || null;
      },
    }),
    {
      name: "code-practice-store",
    }
  )
);
