import express from "express";
import cors from "cors";
import path from "path";
import runGraph from "./ai/graph.ai.js";

const app = express();
app.use(express.json());

// Enable CORS for local development when frontend and backend run on different ports
app.use(cors({ 
  origin: process.env.NODE_ENV === 'production' ? false : 'http://localhost:5173',
  methods: ["GET", "POST"],
  credentials: true
}));

// API Endpoint
app.post("/invoke", async (req, res) => {
  const { input } = req.body;
  const result = await runGraph(input);

  res.status(200).json({
    message: "Graph executed successfully",
    success: true,
    result
  });
});

// Serve frontend build in production and test environments by default
if (process.env.NODE_ENV !== "development") {
  const frontendPath = path.join(process.cwd(), "../Frontend/dist");
  app.use(express.static(frontendPath));

  // Catch-all route to serve React's index.html for client-side routing
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  // Simple health check endpoint in development
  app.get("/", async (req, res) => {
    const result = await runGraph("Write an code for Factorial function in js");
    res.json(result);
  });
}

export default app;