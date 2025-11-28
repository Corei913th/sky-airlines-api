
export type ApiResponse<T> = {
  ok: boolean;
  data: T;
  error?: string;
  meta?: Record<string, any>;
};

// Extension du type Request d'Express pour inclure userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

