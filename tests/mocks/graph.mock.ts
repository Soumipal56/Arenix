const mockRunGraph = (problem: string) => {
  console.log("MOCK RUN GRAPH FACTORY CALLED WITH:", problem);
  return Promise.resolve({
    problem: problem || "Empty Problem Prompt",
    solution_1: "Mocked solution from Model A (Mistral Mock)",
    solution_2: "Mocked solution from Model B (Cohere Mock)",
    judge: {
      solution_1_score: 8,
      solution_2_score: 9,
      solution_1_reasoning: "Model A was clean but lacked recursive elegance.",
      solution_2_reasoning: "Model B was perfect and handled errors elegantly."
    }
  });
};

export default mockRunGraph;
