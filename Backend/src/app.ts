import express from "express";

const app = express();

app.get("/health", (req, res) => {
    res.send("Hello World!");
});

export default app;