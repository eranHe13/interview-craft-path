import { PageShell } from "@/components/common/PageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { Link } from "react-router-dom";
import { Trophy, Clock, Target, Zap, Play, Shuffle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const sessions = useStore((state) => state.sessions);
  const questions = useStore((state) => state.questions);

  const completedSessions = sessions.filter((s) => s.status === "completed");
  const totalTime = sessions.reduce(
    (acc, s) => acc + Object.values(s.timeByStage).reduce((sum, t) => sum + t, 0),
    0
  );
  const avgTime = completedSessions.length > 0 ? totalTime / completedSessions.length : 0;
  
  const recentSessions = sessions.slice(-5).reverse();

  const kpis = [
    {
      icon: Trophy,
      label: "Questions Attempted",
      value: sessions.length,
      color: "text-yellow-500",
    },
    {
      icon: Target,
      label: "Completed",
      value: completedSessions.length,
      color: "text-green-500",
    },
    {
      icon: Clock,
      label: "Avg. Time (min)",
      value: Math.round(avgTime / 60),
      color: "text-blue-500",
    },
    {
      icon: Zap,
      label: "In Progress",
      value: sessions.filter((s) => s.status === "in_progress").length,
      color: "text-primary",
    },
  ];

  const handleRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];
    window.location.href = `/bank?highlight=${question.id}`;
  };

  return (
    <PageShell title="Dashboard" breadcrumbs={[{ label: "Dashboard" }]}>
      <div className="space-y-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                      <p className="text-3xl font-bold">{kpi.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${kpi.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Link to="/bank">
              <Button className="gap-2">
                <Play className="w-4 h-4" />
                Browse Questions
              </Button>
            </Link>
            <Button variant="outline" className="gap-2" onClick={handleRandomQuestion}>
              <Shuffle className="w-4 h-4" />
              Random Question
            </Button>
            {recentSessions.length > 0 && recentSessions[0].status === "in_progress" && (
              <Link to={`/session/${recentSessions[0].id}`}>
                <Button variant="secondary" className="gap-2">
                  <Play className="w-4 h-4" />
                  Continue Last Session
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            {recentSessions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No sessions yet. Start practicing to see your progress!</p>
                <Link to="/bank">
                  <Button className="mt-4">Browse Questions</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentSessions.map((session) => {
                  const question = questions.find((q) => q.id === session.questionId);
                  if (!question) return null;

                  const progress = session.status === "completed" ? 100 : 
                    session.currentStage === "understand" ? 25 :
                    session.currentStage === "idea" ? 50 :
                    session.currentStage === "code" ? 75 : 85;

                  return (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Link to={`/session/${session.id}`}>
                            <h4 className="font-semibold hover:text-primary transition-colors">
                              {question.title}
                            </h4>
                          </Link>
                          <Badge variant={
                            question.difficulty === "Easy" ? "secondary" :
                            question.difficulty === "Medium" ? "default" : "destructive"
                          }>
                            {question.difficulty}
                          </Badge>
                          <Badge variant="outline">{question.category}</Badge>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      <div className="ml-6">
                        <Badge variant={session.status === "completed" ? "default" : "secondary"}>
                          {session.status === "completed" ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
