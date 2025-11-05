import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { Question } from "@/types/question";
import { Session } from "@/types/session";
import { Play, CheckCircle2, XCircle } from "lucide-react";
import Editor from "@monaco-editor/react";
import { runTypeScriptCode } from "@/lib/runner/tsRunner";
import { useTheme } from "@/hooks/use-theme";

interface CodeStageProps {
  question: Question;
  session: Session;
}

export default function CodeStage({ question, session }: CodeStageProps) {
  const { theme } = useTheme();
  const updateStage = useStore((state) => state.updateStage);
  const runTests = useStore((state) => state.runTests);

  const [code, setCode] = useState(
    session.artifacts.code?.source || question.starterCode.ts || ""
  );
  const [language] = useState<"ts" | "py">("ts");
  const [isRunning, setIsRunning] = useState(false);
  const runResult = session.artifacts.code?.runResult;

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateStage("code", {
        language,
        source: code,
        tests: question.defaultTests,
        runResult: runResult,
      });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [code, language, question.defaultTests, runResult, updateStage]);

  const handleRun = async () => {
    setIsRunning(true);
    try {
      // Extract function name from starter code
      const functionMatch = code.match(/function\s+(\w+)/);
      const functionName = functionMatch ? functionMatch[1] : "solution";

      const result = await runTypeScriptCode(code, question.defaultTests, functionName);
      runTests(result);
    } catch (error) {
      console.error("Error running code:", error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
          <div className="flex items-center justify-between">
              <CardTitle>Code Editor</CardTitle>
              <Button onClick={handleRun} disabled={isRunning} className="gap-2">
                <Play className="w-4 h-4" />
                {isRunning ? "Running..." : "Run Tests"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Editor
                height="500px"
                language="typescript"
                value={code}
                onChange={(value) => setCode(value || "")}
                theme={theme === "dark" ? "vs-dark" : "light"}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {!runResult ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Run your code to see test results</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                    <div>
                      <div className="font-semibold">Test Summary</div>
                      <div className="text-sm text-muted-foreground">
                        {runResult.passed} passed, {runResult.failed} failed
                      </div>
                    </div>
                    {runResult.passed === runResult.cases.length ? (
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-500" />
                    )}
                  </div>

                  {runResult.cases.map((testCase) => (
                    <div
                      key={testCase.id}
                      className={`p-4 rounded-lg border ${
                        testCase.pass
                          ? "bg-green-500/5 border-green-500/20"
                          : "bg-red-500/5 border-red-500/20"
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
                      <div className="text-sm space-y-1 font-mono">
                        <div>
                          <span className="text-muted-foreground">Input: </span>
                          {testCase.input}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Expected: </span>
                          {testCase.expected}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Actual: </span>
                          {testCase.actual}
                        </div>
                        {testCase.stderr && (
                          <div className="text-destructive text-xs mt-2 p-2 bg-destructive/10 rounded">
                            {testCase.stderr}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
