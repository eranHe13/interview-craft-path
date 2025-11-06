import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/lib/store";
import { Question } from "@/types/question";
import { Session } from "@/types/session";
import { Plus, X } from "lucide-react";

interface UnderstandStageProps {
  question: Question;
  session: Session;
}

export default function UnderstandStage({ question, session }: UnderstandStageProps) {
  const updateStage = useStore((state) => state.updateStage);

  const [keyPoints, setKeyPoints] = useState<string[]>(
    session.artifacts.understand?.keyPoints || ["", "", ""]
  );
  const [edgeCases, setEdgeCases] = useState<string[]>(
    session.artifacts.understand?.edgeCases || ["", ""]
  );
  const [restatement, setRestatement] = useState(
    session.artifacts.understand?.restatement || ""
  );

  useEffect(() => {
    // Autosave
    const timeout = setTimeout(() => {
      updateStage("understand", { keyPoints, edgeCases, restatement });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [keyPoints, edgeCases, restatement, updateStage]);

  const addKeyPoint = () => setKeyPoints([...keyPoints, ""]);
  const removeKeyPoint = (index: number) =>
    setKeyPoints(keyPoints.filter((_, i) => i !== index));
  const updateKeyPoint = (index: number, value: string) => {
    const updated = [...keyPoints];
    updated[index] = value;
    setKeyPoints(updated);
  };

  const addEdgeCase = () => setEdgeCases([...edgeCases, ""]);
  const removeEdgeCase = (index: number) =>
    setEdgeCases(edgeCases.filter((_, i) => i !== index));
  const updateEdgeCase = (index: number, value: string) => {
    const updated = [...edgeCases];
    updated[index] = value;
    setEdgeCases(updated);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Problem Statement</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap">{question.prompt}</p>

          <h4 className="mt-6">Constraints:</h4>
          <ul>
            {question.constraints.map((constraint, i) => (
              <li key={i}>{constraint}</li>
            ))}
          </ul>

          <h4 className="mt-6">Examples:</h4>
          {question.examples.map((example, i) => (
            <div key={i} className="mb-4 p-4 rounded-lg bg-muted">
              <div>
                <strong>Input:</strong> <code>{example.input}</code>
              </div>
              <div>
                <strong>Output:</strong> <code>{example.output}</code>
              </div>
              {example.explanation && <div className="mt-2">{example.explanation}</div>}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding the Problem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Observations (at least 3)
            </label>
            <p className="text-sm text-muted-foreground mb-3">
              What patterns, hints, or rules do you notice?
            </p>
            <div className="space-y-2">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={point}
                    onChange={(e) => updateKeyPoint(index, e.target.value)}
                    placeholder={`Observation ${index + 1}`}
                  />
                  {keyPoints.length > 3 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeKeyPoint(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addKeyPoint} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Observation
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Edge Cases (at least 2)
            </label>
            <p className="text-sm text-muted-foreground mb-3">
              Which tricky inputs could challenge your logic?
            </p>
            <div className="space-y-2">
              {edgeCases.map((edgeCase, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={edgeCase}
                    onChange={(e) => updateEdgeCase(index, e.target.value)}
                    placeholder={`Edge case ${index + 1}`}
                  />
                  {edgeCases.length > 2 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEdgeCase(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addEdgeCase} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Edge Case
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Restate in Your Own Words
            </label>
            <p className="text-sm text-muted-foreground mb-3">
              Explain what the task really asks for.
            </p>
            <Textarea
              value={restatement}
              onChange={(e) => setRestatement(e.target.value)}
              placeholder="Explain what this problem is asking for in your own words..."
              rows={6}
              className="font-mono"
            />
            <div className="text-xs text-muted-foreground mt-1">
              {restatement.length} / 200 characters
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
