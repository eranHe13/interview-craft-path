import { PageShell } from "@/components/common/PageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function Analytics() {
  const sessions = useStore((state) => state.sessions);
  const questions = useStore((state) => state.questions);

  const categoryData = questions.reduce((acc, q) => {
    const category = q.category;
    const categoryStats = acc.find((item) => item.category === category);
    const sessionCount = sessions.filter((s) => s.questionId === q.id).length;
    const completedCount = sessions.filter((s) => s.questionId === q.id && s.status === "completed").length;

    if (categoryStats) {
      categoryStats.attempted += sessionCount;
      categoryStats.completed += completedCount;
    } else {
      acc.push({
        category,
        attempted: sessionCount,
        completed: completedCount,
      });
    }
    return acc;
  }, [] as Array<{ category: string; attempted: number; completed: number }>);

  const difficultyData = ["Easy", "Medium", "Hard"].map((difficulty) => ({
    difficulty,
    count: questions.filter((q) => q.difficulty === difficulty).length,
  }));

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  return (
    <PageShell title="Analytics" breadcrumbs={[{ label: "Analytics" }]}>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Questions by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="attempted" fill="hsl(var(--primary))" name="Attempted" />
                  <Bar dataKey="completed" fill="hsl(var(--success))" name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Difficulty Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={difficultyData}
                    dataKey="count"
                    nameKey="difficulty"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Summary Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Total Questions</div>
                <div className="text-3xl font-bold">{questions.length}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Attempted</div>
                <div className="text-3xl font-bold">{sessions.length}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Completed</div>
                <div className="text-3xl font-bold">
                  {sessions.filter((s) => s.status === "completed").length}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Success Rate</div>
                <div className="text-3xl font-bold">
                  {sessions.length > 0
                    ? Math.round(
                        (sessions.filter((s) => s.status === "completed").length / sessions.length) * 100
                      )
                    : 0}
                  %
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
