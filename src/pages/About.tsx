import { PageShell } from "@/components/common/PageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Keyboard } from "lucide-react";

export default function About() {
  const shortcuts = [
    { keys: ["Ctrl/Cmd", "K"], action: "Open command palette (coming soon)" },
    { keys: ["Ctrl/Cmd", "S"], action: "Save current progress" },
    { keys: ["Esc"], action: "Close modals" },
  ];

  return (
    <PageShell title="About" breadcrumbs={[{ label: "About" }]}>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>The 4-Stage Learning Method</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>
              CodeMaster uses a structured, gated approach to help you deeply understand coding interview
              problems, not just memorize solutions.
            </p>

            <h3>Stage 1: Understand</h3>
            <p>
              Before diving into code, you must demonstrate understanding by identifying key constraints,
              edge cases, and restating the problem in your own words. This builds the foundation for
              effective problem-solving.
            </p>

            <h3>Stage 2: Idea & Pseudocode</h3>
            <p>
              Plan your approach by selecting appropriate data structures, estimating complexity, and
              writing pseudocode. This stage bridges understanding and implementation.
            </p>

            <h3>Stage 3: Code & Test</h3>
            <p>
              Implement your solution in TypeScript or Python, run automated tests, and iterate based on
              feedback. Real-time test execution helps you catch bugs early.
            </p>

            <h3>Stage 4: Analysis</h3>
            <p>
              Reflect on your solution: what worked, what didn't, and what you learned. This
              metacognitive step cements learning and helps you identify patterns.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Keyboard className="w-5 h-5" />
              Keyboard Shortcuts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {shortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <span className="text-sm">{shortcut.action}</span>
                  <div className="flex gap-1">
                    {shortcut.keys.map((key) => (
                      <kbd
                        key={key}
                        className="px-2 py-1 text-xs font-semibold rounded bg-background border"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
