import { ILogger } from "@/types/interfaces/logger/ILogger";
import { LogLevelEnum } from "@/types/enum";
import { Logger } from "@/utils/logger";

/**
 * Factory pour créer des loggers avec contexte
 */
export class LoggerFactory {
  private static loggers = new Map<string, Logger>();

  static create(context: string, minLevel: LogLevelEnum = LogLevelEnum.INFO): ILogger {
    if (!this.loggers.has(context)) {
      this.loggers.set(context, new Logger(context, minLevel));
    }
    return this.loggers.get(context)!;
  }

  static getDefault(): ILogger {
    return this.create('APP');
  }
}

// Export d'une instance par défaut
export const logger = LoggerFactory.getDefault();