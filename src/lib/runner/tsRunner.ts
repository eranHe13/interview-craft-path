import { RunResult, TestCase } from "@/types/session";

export async function runTypeScriptCode(
  code: string,
  tests: TestCase[],
  functionName: string
): Promise<RunResult> {
  const results: RunResult = {
    passed: 0,
    failed: 0,
    totalTime: 0,
    cases: [],
  };

  try {
    // Simple eval-based runner for demo purposes
    // In production, use a proper sandboxed environment
    const wrappedCode = `
      ${code}
      return ${functionName};
    `;

    const fn = new Function(wrappedCode)();

    for (const test of tests) {
      const startTime = performance.now();
      try {
        // Parse input
        const args = parseInput(test.input);
        
        // Execute function
        const actual = fn(...args);
        const actualStr = JSON.stringify(actual);
        const pass = actualStr === test.expected;

        const endTime = performance.now();

        results.cases.push({
          id: test.id,
          name: test.name,
          input: test.input,
          expected: test.expected,
          actual: actualStr,
          pass,
          time: endTime - startTime,
        });

        if (pass) {
          results.passed++;
        } else {
          results.failed++;
        }
      } catch (error: any) {
        const endTime = performance.now();
        results.cases.push({
          id: test.id,
          name: test.name,
          input: test.input,
          expected: test.expected,
          actual: "",
          pass: false,
          stderr: error.message,
          time: endTime - startTime,
        });
        results.failed++;
      }

      results.totalTime += results.cases[results.cases.length - 1].time || 0;
    }
  } catch (error: any) {
    // Code compilation error
    for (const test of tests) {
      results.cases.push({
        id: test.id,
        name: test.name,
        input: test.input,
        expected: test.expected,
        actual: "",
        pass: false,
        stderr: `Compilation error: ${error.message}`,
      });
      results.failed++;
    }
  }

  return results;
}

function parseInput(input: string): any[] {
  // Simple parser for common input formats
  try {
    // Remove outer brackets if present and split by comma
    const cleaned = input.trim();
    
    // Try to parse as JSON array
    if (cleaned.startsWith("[")) {
      return [JSON.parse(cleaned)];
    }
    
    // Split by comma for multiple arguments
    const parts = cleaned.split(",").map((p) => p.trim());
    return parts.map((part) => {
      try {
        return JSON.parse(part);
      } catch {
        // Return as string if not valid JSON
        return part.replace(/^["']|["']$/g, "");
      }
    });
  } catch {
    return [input];
  }
}
