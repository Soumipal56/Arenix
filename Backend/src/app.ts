import express from "express";
import useGraph from "./services/graph.ai.service.js";

const app = express();

app.get("/health", (req, res) => {
    res.send("Hello World!");
});

app.post("/use-graph", async (req, res) => {
    await useGraph("Write factorial function in javascript")
})

export default app;