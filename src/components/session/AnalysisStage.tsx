import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { Question } from "@/types/question";
import { Session } from "@/types/session";
import { Plus, X } from "lucide-react";

interface AnalysisStageProps {
  question: Question;
  session: Session;
}

export default function AnalysisStage({ question, session }: AnalysisStageProps) {
  const updateStage = useStore((state) => state.updateStage);

  const [summary, setSummary] = useState(session.artifacts.analysis?.summary || "");
  const [lessons, setLessons] = useState<string[]>(
    session.artifacts.analysis?.lessons || ["", ""]
  );
  const [revisedTime, setRevisedTime] = useState(
    session.artifacts.analysis?.revisedComplexity?.time || ""
  );
  const [revisedSpace, setRevisedSpace] = useState(
    session.artifacts.analysis?.revisedComplexity?.space || ""
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateStage("analysis", {
        summary,
        lessons: lessons.filter((l) => l.trim()),
        revisedComplexity: revisedTime || revisedSpace ? {
          time: revisedTime,
          space: revisedSpace,
        } : undefined,
      });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [summary, lessons, revisedTime, revisedSpace, updateStage]);

  const addLesson = () => setLessons([...lessons, ""]);
  const removeLesson = (index: number) => setLessons(lessons.filter((_, i) => i !== index));
  const updateLesson = (index: number, value: string) => {
    const updated = [...lessons];
    updated[index] = value;
    setLessons(updated);
  };

  const runResult = session.artifacts.code?.runResult;

  return (
    <div className="space-y-6">
      {runResult && (
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Tests Passed</div>
                <div className="text-2xl font-bold">
                  {runResult.passed} / {runResult.cases.length}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Execution Time</div>
                <div className="text-2xl font-bold">{Math.round(runResult.totalTime)}ms</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Hints Used</div>
                <div className="text-2xl font-bold">{session.usedHints}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Reflect and Analyze</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Look back on your solution and extract insights.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Summary of Your Solution
            </label>
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Explain how your solution worked and what challenges you faced..."
              rows={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Key Lessons Learned (at least 2 required)
            </label>
            <div className="space-y-2">
              {lessons.map((lesson, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={lesson}
                    onChange={(e) => updateLesson(index, e.target.value)}
                    placeholder={`Lesson ${index + 1}`}
                  />
                  {lessons.length > 2 && (
                    <Button variant="ghost" size="icon" onClick={() => removeLesson(index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addLesson} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Lesson
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Revised Complexities (optional)
            </label>
            <p className="text-sm text-muted-foreground mb-3">
              If your actual implementation differs, update your time/space complexity here.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Revised Time Complexity
                </label>
              <Input
                value={revisedTime}
                onChange={(e) => setRevisedTime(e.target.value)}
                placeholder="e.g., O(n)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Revised Space Complexity
                </label>
              <Input
                value={revisedSpace}
                onChange={(e) => setRevisedSpace(e.target.value)}
                placeholder="e.g., O(1)"
              />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
