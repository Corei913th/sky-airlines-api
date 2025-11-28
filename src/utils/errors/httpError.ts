export class HttpError extends Error {
  statusCode: number;
  details?: any;

  constructor(statusCode: number, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, HttpError.prototype);
  }

  static BadRequest(message: string | any, details?: any) {
    const messageString = typeof message === 'string' ? message : String(message);
    return new HttpError(400, messageString, details);
  }

  static Unauthorized(message: string | any, details?: any) {
    const messageString = typeof message === 'string' ? message : String(message);
    return new HttpError(401, messageString, details);
  }

  static Forbidden(message: string | any, details?: any) {
    const messageString = typeof message === 'string' ? message : String(message);
    return new HttpError(403, messageString, details);
  }

  static NotFound(message: string | any) {
    const messageString = typeof message === 'string' ? message : String(message);
    return new HttpError(404, messageString);
  }

  static Conflict(message: string | any, details?: any) {
    const messageString = typeof message === 'string' ? message : String(message);
    return new HttpError(409, messageString, details);
  }

  static Internal(message: string | any) {
    const messageString = typeof message === 'string' ? message : String(message);
    return new HttpError(500, messageString);
  }
}
