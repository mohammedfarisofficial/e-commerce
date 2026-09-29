import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { seedDatabase } from "./config/seed";
import healthRouter from "./routes/health";
import v1Router from "./modules/v1";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: true, credentials: true }));
app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/health", healthRouter);
app.use("/api/v1", v1Router);

app.get("/", (_req, res) => {
  res.json({
    message: "E-Commerce API Server",
    version: "1.0.0",
    healthCheck: "/api/health",
  });
});

const startServer = async () => {
  await connectDB();
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

export default app;
