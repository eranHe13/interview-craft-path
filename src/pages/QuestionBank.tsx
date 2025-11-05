import { useState, useMemo } from "react";
import { PageShell } from "@/components/common/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Play, Pin, Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, Difficulty } from "@/types/question";

export default function QuestionBank() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get("highlight");
  
  const questions = useStore((state) => state.questions);
  const sessions = useStore((state) => state.sessions);
  const pinnedQuestions = useStore((state) => state.pinnedQuestions);
  const pinQuestion = useStore((state) => state.pinQuestion);
  const unpinQuestion = useStore((state) => state.unpinQuestion);
  const createSession = useStore((state) => state.createSession);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">("all");

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = categoryFilter === "all" || q.category === categoryFilter;
      const matchesDifficulty = difficultyFilter === "all" || q.difficulty === difficultyFilter;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [questions, search, categoryFilter, difficultyFilter]);

  const handleStartQuestion = (questionId: string) => {
    const sessionId = createSession(questionId);
    navigate(`/session/${sessionId}`);
  };

  const togglePin = (questionId: string) => {
    if (pinnedQuestions.includes(questionId)) {
      unpinQuestion(questionId);
    } else {
      pinQuestion(questionId);
    }
  };

  const getQuestionStatus = (questionId: string) => {
    const questionSessions = sessions.filter((s) => s.questionId === questionId);
    if (questionSessions.length === 0) return "unseen";
    const hasCompleted = questionSessions.some((s) => s.status === "completed");
    if (hasCompleted) return "solved";
    return "in-progress";
  };

  const categories: Array<Category | "all"> = [
    "all", "Arrays", "Strings", "HashMap", "TwoPointers", "DP",
    "Graphs", "Trees", "Math", "Greedy", "Backtracking"
  ];

  const difficulties: Array<Difficulty | "all"> = ["all", "Easy", "Medium", "Hard"];

  return (
    <PageShell title="Question Bank" breadcrumbs={[{ label: "Question Bank" }]}>
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or tags..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={difficultyFilter} onValueChange={(v) => setDifficultyFilter(v as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((diff) => (
                    <SelectItem key={diff} value={diff}>
                      {diff === "all" ? "All Difficulties" : diff}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Questions List */}
        <div className="space-y-3">
          {filteredQuestions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                No questions found. Try adjusting your filters.
              </CardContent>
            </Card>
          ) : (
            filteredQuestions.map((question) => {
              const status = getQuestionStatus(question.id);
              const isPinned = pinnedQuestions.includes(question.id);
              const isHighlighted = highlightId === question.id;

              return (
                <Card
                  key={question.id}
                  className={`transition-all hover:shadow-md ${isHighlighted ? "ring-2 ring-primary" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{question.title}</h3>
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
                          {status === "solved" && (
                            <Badge className="bg-green-500">Solved</Badge>
                          )}
                          {status === "in-progress" && (
                            <Badge variant="secondary">In Progress</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {question.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePin(question.id)}
                          className={isPinned ? "text-yellow-500" : ""}
                        >
                          <Pin className={`w-4 h-4 ${isPinned ? "fill-current" : ""}`} />
                        </Button>
                        <Button onClick={() => handleStartQuestion(question.id)} className="gap-2">
                          <Play className="w-4 h-4" />
                          {status === "in-progress" ? "Continue" : "Start"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </PageShell>
  );
}
