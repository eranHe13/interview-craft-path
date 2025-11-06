import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { Question } from "@/types/question";
import { Session } from "@/types/session";
import { Plus, X } from "lucide-react";

interface IdeaStageProps {
  question: Question;
  session: Session;
}

export default function IdeaStage({ question, session }: IdeaStageProps) {
  const updateStage = useStore((state) => state.updateStage);

  const [approach, setApproach] = useState(session.artifacts.idea?.approach || "");
  const [dataStructures, setDataStructures] = useState<string[]>(
    session.artifacts.idea?.dataStructures || [""]
  );
  const [timeComplexity, setTimeComplexity] = useState(
    session.artifacts.idea?.complexity?.time || ""
  );
  const [spaceComplexity, setSpaceComplexity] = useState(
    session.artifacts.idea?.complexity?.space || ""
  );
  const [pseudocode, setPseudocode] = useState(session.artifacts.idea?.pseudocode || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateStage("idea", {
        approach,
        dataStructures: dataStructures.filter((d) => d.trim()),
        complexity: { time: timeComplexity, space: spaceComplexity },
        pseudocode,
      });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [approach, dataStructures, timeComplexity, spaceComplexity, pseudocode, updateStage]);

  const addDataStructure = () => setDataStructures([...dataStructures, ""]);
  const removeDataStructure = (index: number) =>
    setDataStructures(dataStructures.filter((_, i) => i !== index));
  const updateDataStructure = (index: number, value: string) => {
    const updated = [...dataStructures];
    updated[index] = value;
    setDataStructures(updated);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Plan Your Approach</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Outline how you'd solve this step by step before writing any code.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Approach Summary (min 150 characters)
            </label>
            <Textarea
              value={approach}
              onChange={(e) => setApproach(e.target.value)}
              placeholder="Briefly explain the logic behind your plan — not the code itself..."
              rows={6}
            />
            <div className="text-xs text-muted-foreground mt-1">
              {approach.length} / 150 characters
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Data Structures (at least 1 required)
            </label>
            <p className="text-sm text-muted-foreground mb-3">
              List which data structures you'll use and why.
            </p>
            <div className="space-y-2">
              {dataStructures.map((ds, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={ds}
                    onChange={(e) => updateDataStructure(index, e.target.value)}
                    placeholder="e.g., Hash Map, Array, Stack..."
                  />
                  {dataStructures.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDataStructure(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addDataStructure} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Data Structure
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Complexity Estimates</label>
            <p className="text-sm text-muted-foreground mb-3">
              Estimate the time and space complexity of your plan.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Time Complexity</label>
              <Input
                value={timeComplexity}
                onChange={(e) => setTimeComplexity(e.target.value)}
                placeholder="e.g., O(n)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Space Complexity</label>
              <Input
                value={spaceComplexity}
                onChange={(e) => setSpaceComplexity(e.target.value)}
                placeholder="e.g., O(1)"
              />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pseudocode</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Write rough pseudocode to visualize your logic.
          </p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={pseudocode}
            onChange={(e) => setPseudocode(e.target.value)}
            placeholder={`Write your pseudocode here...\n\nExample:\n1. Initialize empty hash map\n2. For each number in array:\n   a. Calculate complement\n   b. Check if complement exists in map\n   c. If yes, return indices\n   d. Add number to map\n3. Return empty array`}
            rows={15}
            className="font-mono text-sm"
          />
        </CardContent>
      </Card>
    </div>
  );
}
