import { ApiResponse } from "@/types/api.type";

export function createSuccessResponse<T>(
  data: T, 
  meta?: Record<string, any>
): ApiResponse<T> & { meta?: Record<string, any> } {
  return {
    ok: true,
    data,
    ...(meta && { meta })
  };
}

export function createErrorResponse(
  error: string, 
  meta?: Record<string, any>
): ApiResponse<null> {
  return {
    ok: false,
    data: null,
    error,
    ...(meta && { meta })
  };
}