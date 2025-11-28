import { Request, Response, NextFunction } from "express";
import { HttpError } from "./httpError";

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error:", err);

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
      details: err.details,
    });
  }

  return res.status(500).json({
    status: "error",
    statusCode: 500,
    message: "Erreur interne du serveur",
  });
}
