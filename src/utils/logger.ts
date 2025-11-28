import { ILogger } from "@/types/interfaces/logger/ILogger";
import { LogLevelEnum } from "@/types/enum";


/**
 * Service de logging centralisé
 * 
 * @class Logger
 */
export class Logger implements ILogger {
  private readonly minLevel: LogLevelEnum;
  private readonly context?: string;

  constructor(context?: string, minLevel: LogLevelEnum = LogLevelEnum.INFO) {
    this.context = context;
    this.minLevel = minLevel;
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    const context = this.context ? `[${this.context}]` : '';
    return `${timestamp} ${level} ${context} ${message}`;
  }

  debug(message: string, ...args: any[]): void {
    if (this.minLevel <= LogLevelEnum.DEBUG) {
      console.debug(this.formatMessage('🔍 [DEBUG]', message), ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.minLevel <= LogLevelEnum.INFO) {
      console.log(this.formatMessage('ℹ️  [INFO]', message), ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.minLevel <= LogLevelEnum.WARN) {
      console.warn(this.formatMessage('⚠️  [WARN]', message), ...args);
    }
  }

  error(message: string, error?: Error | unknown, ...args: any[]): void {
    if (this.minLevel <= LogLevelEnum.ERROR) {
      const errorDetails = error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error;
      console.error(this.formatMessage('❌ [ERROR]', message), errorDetails, ...args);
    }
  }
}



