import { StateGraph, StateSchema, START, END, type GraphNode, type CompiledStateGraph } from "@langchain/langgraph";
import z from "zod";
import { mistralAIModel, cohereModel, geminiModel } from "./model.ai.js";
import { createAgent, HumanMessage, providerStrategy } from "langchain";

const state = new StateSchema({
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

const solutionNode: GraphNode<typeof state> = async (state) => {
    const [mistralResult, cohereResult] = await Promise.allSettled([
        mistralAIModel.invoke(state.problem),
        cohereModel.invoke(state.problem),
    ]);

    const solution_1 = mistralResult.status === 'fulfilled' 
        ? mistralResult.value.text 
        : `[Error: Mistral AI failed to respond. They might be experiencing rate limits (429).]`;
        
    const solution_2 = cohereResult.status === 'fulfilled' 
        ? cohereResult.value.text 
        : `[Error: Cohere AI failed to respond. They might be experiencing rate limits (429).]`;

    return {
        solution_1,
        solution_2,
    };
}

const judgeNode: GraphNode<typeof state> = async (state) => {
    const { problem, solution_1, solution_2 } = state; 

    const judge = createAgent({
        model: geminiModel,
        responseFormat:providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
            solution_1_reasoning: z.string(),
            solution_2_reasoning: z.string(),
        })),

        systemPrompt: `You are a judge tasked with evaluating two solutions
        generating by dfferent AI models. Please provide a score out of 10 for each
        solution and also provide a reasoning for each score.
        `
    })

    try {
        const judgeResponse = await judge.invoke({
            messages: [
                new HumanMessage(`
                    Problem: ${problem}
                    Solution 1: ${solution_1}
                    Solution 2: ${solution_2}
                    Please evaluate the solutions and provide scores and reasoning.
                `)
            ]
        });

        const {
            solution_1_score,
            solution_2_score,
            solution_1_reasoning,
            solution_2_reasoning
        } = judgeResponse.structuredResponse;

        return {
            judge: {
                solution_1_score,
                solution_2_score,
                solution_1_reasoning,
                solution_2_reasoning,
            }
        };
    } catch (error) {
        console.error("Judge Node Error:", error);
        return {
            judge: {
                solution_1_score: 0,
                solution_2_score: 0,
                solution_1_reasoning: "[Error: Gemini judge model failed to respond, likely due to rate limits (429).]",
                solution_2_reasoning: "[Error: Gemini judge model failed to respond, likely due to rate limits (429).]",
            }
        };
    }
}

const graph = new StateGraph(state)
    .addNode('solution', solutionNode)
    .addNode('judge_node', judgeNode)
    .addEdge(START, 'solution')
    .addEdge('solution', 'judge_node')
    .addEdge('judge_node', END)
    .compile();

export default async function (problem: string){
    const result = await graph.invoke({ 
        problem: problem
    });

    return result;
}

