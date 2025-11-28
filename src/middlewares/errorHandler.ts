import { Request, Response, NextFunction } from "express";
import { HttpError } from "@/utils/errors/httpError";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      details: err.details,
    });
  }

  console.error(err);
  res.status(500).json({
    status: "error",
    message: "Erreur interne du serveur",
  });
}
