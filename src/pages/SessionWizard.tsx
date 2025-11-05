import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "@/lib/store";
import { PageShell } from "@/components/common/PageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Save, X } from "lucide-react";
import { StageKey } from "@/types/session";
import UnderstandStage from "@/components/session/UnderstandStage";
import IdeaStage from "@/components/session/IdeaStage";
import CodeStage from "@/components/session/CodeStage";
import AnalysisStage from "@/components/session/AnalysisStage";

const stageOrder: StageKey[] = ["understand", "idea", "code", "analysis"];

export default function SessionWizard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const session = useStore((state) => state.sessions.find((s) => s.id === id));
  const questions = useStore((state) => state.questions);
  const setCurrentSession = useStore((state) => state.setCurrentSession);
  
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  
  useEffect(() => {
    if (id) {
      setCurrentSession(id);
    }
    return () => setCurrentSession(null);
  }, [id, setCurrentSession]);

  if (!session) {
    return (
      <PageShell>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Session not found</p>
          <Button onClick={() => navigate("/bank")} className="mt-4">
            Back to Question Bank
          </Button>
        </div>
      </PageShell>
    );
  }

  const question = questions.find((q) => q.id === session.questionId);
  if (!question) {
    return (
      <PageShell>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Question not found</p>
        </div>
      </PageShell>
    );
  }

  const currentStage = stageOrder[currentStageIndex];
  const progress = ((currentStageIndex + 1) / stageOrder.length) * 100;

  const handleNext = () => {
    if (currentStageIndex < stageOrder.length - 1) {
      setCurrentStageIndex(currentStageIndex + 1);
    } else {
      // Complete session
      navigate(`/results/${session.id}`);
    }
  };

  const handleBack = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(currentStageIndex - 1);
    }
  };

  const handleExit = () => {
    navigate("/dashboard");
  };

  return (
    <PageShell
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Session", href: `/session/${id}` },
      ]}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{question.title}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={
                      question.difficulty === "Easy"
                        ? "secondary"
                        : question.difficulty === "Medium"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {question.difficulty}
                  </Badge>
                  <Badge variant="outline">{question.category}</Badge>
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleExit}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Stage {currentStageIndex + 1} of {stageOrder.length}: {currentStage}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} />
              <div className="flex gap-2">
                {stageOrder.map((stage, index) => (
                  <button
                    key={stage}
                    onClick={() => setCurrentStageIndex(index)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      index === currentStageIndex
                        ? "bg-primary text-primary-foreground"
                        : index < currentStageIndex
                        ? "bg-muted text-foreground"
                        : "bg-muted/50 text-muted-foreground"
                    }`}
                  >
                    {stage.charAt(0).toUpperCase() + stage.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stage Content */}
        <div className="min-h-[600px]">
          {currentStage === "understand" && (
            <UnderstandStage question={question} session={session} />
          )}
          {currentStage === "idea" && (
            <IdeaStage question={question} session={session} />
          )}
          {currentStage === "code" && (
            <CodeStage question={question} session={session} />
          )}
          {currentStage === "analysis" && (
            <AnalysisStage question={question} session={session} />
          )}
        </div>

        {/* Navigation Footer */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStageIndex === 0}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Save className="w-4 h-4" />
                  Save
                </Button>
                <Button onClick={handleNext} className="gap-2">
                  {currentStageIndex === stageOrder.length - 1 ? "Finish" : "Next"}
                  {currentStageIndex < stageOrder.length - 1 && (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
