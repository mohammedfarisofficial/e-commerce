import { Router, Request, Response } from "express";
import mongoose from "mongoose";

const router = Router();

/**
 * GET /api/health
 * Simple health check endpoint that reports server and database status.
 */
router.get("/", (_req: Request, res: Response) => {
  const mongoState = mongoose.connection.readyState;
  const mongoStatus: Record<number, string> = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  const healthCheck = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    database: {
      status: mongoStatus[mongoState] || "unknown",
      name: mongoose.connection.name || "N/A",
    },
    memory: {
      rss: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
      heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
    },
  };

  const statusCode = mongoState === 1 ? 200 : 503;
  res.status(statusCode).json(healthCheck);
});

export default router;
