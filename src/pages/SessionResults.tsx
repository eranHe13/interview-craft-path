import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "@/lib/store";
import { PageShell } from "@/components/common/PageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, ArrowRight } from "lucide-react";

export default function SessionResults() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const session = useStore((state) => state.sessions.find((s) => s.id === id));
  const questions = useStore((state) => state.questions);
  const finishSession = useStore((state) => state.finishSession);

  if (!session) {
    return (
      <PageShell>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Session not found</p>
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </div>
      </PageShell>
    );
  }

  const question = questions.find((q) => q.id === session.questionId);
  const runResult = session.artifacts.code?.runResult;
  const totalTime = Object.values(session.timeByStage).reduce((sum, t) => sum + t, 0);

  return (
    <PageShell
      title="Session Results"
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Results" },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{question?.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Total Time</div>
                <div className="text-2xl font-bold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  {Math.round(totalTime / 60)}m
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Tests Passed</div>
                <div className="text-2xl font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  {runResult?.passed || 0}/{(runResult?.passed || 0) + (runResult?.failed || 0)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Hints Used</div>
                <div className="text-2xl font-bold">{session.usedHints}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Attempts</div>
                <div className="text-2xl font-bold">{session.attempts}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {runResult && (
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {runResult.cases.map((testCase) => (
                <div
                  key={testCase.id}
                  className={`p-4 rounded-lg border ${
                    testCase.pass ? "bg-green-500/5 border-green-500/20" : "bg-red-500/5 border-red-500/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{testCase.name}</span>
                    {testCase.pass ? (
                      <Badge className="bg-green-500">Passed</Badge>
                    ) : (
                      <Badge variant="destructive">Failed</Badge>
                    )}
                  </div>
                  <div className="text-sm space-y-1">
                    <div>
                      <span className="text-muted-foreground">Input: </span>
                      <code className="font-mono">{testCase.input}</code>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expected: </span>
                      <code className="font-mono">{testCase.expected}</code>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Actual: </span>
                      <code className="font-mono">{testCase.actual}</code>
                    </div>
                    {testCase.stderr && (
                      <div className="text-destructive text-xs mt-2">{testCase.stderr}</div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <div className="flex gap-4">
          <Button onClick={() => navigate("/dashboard")} className="flex-1">
            Back to Dashboard
          </Button>
          <Button onClick={() => navigate("/bank")} variant="outline" className="flex-1 gap-2">
            Next Question
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
