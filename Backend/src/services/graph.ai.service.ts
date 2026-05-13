import { StateSchema, MessagesValue, ReducedValue, StateGraph, START, END } from "@langchain/langgraph" 
import type { GraphNode } from "@langchain/langgraph"
import { HumanMessage } from "@langchain/core/messages";
import { mistralModel, cohereModel} from "./models.service.js"
import { z } from "zod";


const State = new StateSchema({
    messages: MessagesValue,
    solution_1: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next
        }
    }),
    solution_2: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next
        }
    }),
    judge_recommendation: new ReducedValue(z.object().default({
       solution_1_score: 0,
       solution_2_score: 0,
    }),
    {
        reducer: (current, next) => {
            return next
        }
    }
)});

const solutionNode:GraphNode<typeof State> = async (state:typeof State)=>{

    console.log("Current State:", state)

    const [mistral_solution, cohere_solution] = await Promise.all([
        mistralModel.invoke(state.messages[0].content),
        cohereModel.invoke(state.messages[0].content)
    ])

    return {
        solution_1: mistral_solution.content as string,
        solution_2: cohere_solution.content as string
    }
}

const graph = new StateGraph(State)
    .addNode("solution", solutionNode)
    .addEdge(START, "solution")
    .addEdge("solution", END)
    .compile();

export default async function(userMessage:string){
    const result = await graph.invoke({
        messages: [
            new HumanMessage(userMessage)
        ]
    })

    console.log(result)

    return result.messages
}  