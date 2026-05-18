import request from "supertest";
import app from "../../Backend/src/app";

describe("Arenix Express API Integration Tests", () => {
  test("POST /invoke - should successfully run graph with mock solutions", async () => {
    const response = await request(app)
      .post("/invoke")
      .send({ input: "Write a function to reverse a string" })
      .set("Accept", "application/json");

    console.log("DEBUG RESPONSE BODY:", response.body);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Graph executed successfully");
    expect(response.body.result).toBeDefined();
    expect(response.body.result.problem).toBe("Write a function to reverse a string");
    expect(response.body.result.solution_1).toContain("Mistral Mock");
    expect(response.body.result.solution_2).toContain("Cohere Mock");
    expect(response.body.result.judge.solution_1_score).toBe(8);
    expect(response.body.result.judge.solution_2_score).toBe(9);
  });

  test("POST /invoke - should respond with success even on empty payload", async () => {
    const response = await request(app)
      .post("/invoke")
      .send({})
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
