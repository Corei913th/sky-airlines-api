import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { ENV } from "./config/env";


const app = express();

// --- HTTP Request Logging ---
app.use((req: Request, res: Response, next: NextFunction) => {
  const startedAt = Date.now();
  console.log(`[HTTP] → ${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    const duration = Date.now() - startedAt;
    console.log(
      `[HTTP] ← ${req.method} ${req.originalUrl} | ${res.statusCode} | ${duration}ms`
    );
  });

  next();
});



// --- CORS ---
app.use(
  cors({
    origin: ENV.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    //credentials: true,
  })
);

// --- Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb" }));

// --- Routes publiques ---


// --- Routes protégées ---


export default app;
