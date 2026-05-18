import z from "zod";

describe("Arenix LangGraph State Schema Unit Tests", () => {
  // Matches the state schema defined in Backend/src/ai/graph.ai.ts
  const stateSchema = z.object({
    problem: z.string().default(""),
    solution_1: z.string().default(""),
    solution_2: z.string().default(""),
    judge: z.object({
      solution_1_score: z.number().default(0),
      solution_2_score: z.number().default(0),
      solution_1_reasoning: z.string().default(""),
      solution_2_reasoning: z.string().default(""),
    })
  });

  test("should apply default values correctly for empty state", () => {
    const defaultData = stateSchema.parse({ judge: {} });
    expect(defaultData.problem).toBe("");
    expect(defaultData.solution_1).toBe("");
    expect(defaultData.solution_2).toBe("");
    expect(defaultData.judge.solution_1_score).toBe(0);
    expect(defaultData.judge.solution_2_score).toBe(0);
    expect(defaultData.judge.solution_1_reasoning).toBe("");
    expect(defaultData.judge.solution_2_reasoning).toBe("");
  });

  test("should validate correct inputs successfully", () => {
    const validPayload = {
      problem: "Write a JS Factorial function",
      solution_1: "const f = n => n <= 1 ? 1 : n * f(n - 1);",
      solution_2: "function fact(n) { return n <= 1 ? 1 : n * fact(n-1) }",
      judge: {
        solution_1_score: 9,
        solution_2_score: 8,
        solution_1_reasoning: "Compact and modern syntax.",
        solution_2_reasoning: "Classic readable recursive implementation."
      }
    };

    const parsed = stateSchema.parse(validPayload);
    expect(parsed.problem).toBe("Write a JS Factorial function");
    expect(parsed.judge.solution_1_score).toBe(9);
    expect(parsed.judge.solution_2_score).toBe(8);
  });

  test("should fail validation and throw for invalid schemas", () => {
    const invalidPayload = {
      problem: 12345, // invalid type
      solution_1: "const a = 1",
      solution_2: "const b = 2",
      judge: {
        solution_1_score: "excellent", // invalid type
      }
    };

    expect(() => stateSchema.parse(invalidPayload)).toThrow();
  });
});
