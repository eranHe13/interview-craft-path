import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell } from "@/components/common/PageShell";
import { Brain, Code2, Target, TrendingUp, Play, Library } from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: Brain,
      title: "Understand",
      description: "Break down problems systematically by identifying key points and edge cases.",
    },
    {
      icon: Code2,
      title: "Idea & Pseudocode",
      description: "Plan your approach with data structures and complexity analysis.",
    },
    {
      icon: Target,
      title: "Code & Test",
      description: "Implement solutions with live testing and instant feedback.",
    },
    {
      icon: TrendingUp,
      title: "Analysis",
      description: "Reflect on your solution and identify areas for improvement.",
    },
  ];

  return (
    <PageShell>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center py-20 gradient-hero rounded-3xl mb-16 px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Master Coding Interviews
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Train with our unique 4-stage gated learning system. Build deep understanding,
            not just memorization.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/bank">
              <Button size="lg" className="gap-2">
                <Play className="w-5 h-5" />
                Start Practice
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="gap-2">
                <Library className="w-5 h-5" />
                View Dashboard
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            The 4-Stage Learning Method
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10" />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Stats Preview */}
        <section className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Curated Problems</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">10+</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">4</div>
              <div className="text-sm text-muted-foreground">Learning Stages</div>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageShell>
  );
}
