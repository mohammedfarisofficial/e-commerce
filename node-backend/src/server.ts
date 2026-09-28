import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import healthRouter from "./routes/health";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/health", healthRouter);

// Root route
app.get("/", (_req, res) => {
  res.json({
    message: "E-Commerce API Server",
    version: "1.0.0",
    healthCheck: "/api/health",
  });
});

// Connect to MongoDB and start server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

export default app;
