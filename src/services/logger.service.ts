import logger from "../config/logger";

type LoggerServiceDependencies = {
  logger: typeof logger;
}

export interface ILoggerMixin {
  loggerInfo(message: string, data?: any): void;
  loggerErro(message: string, data?: any): void;
}

export function LoggerMixin<T extends new (...args: any[]) => {}>(Base: T) {
  return class extends Base {
    logger: typeof logger;

    constructor(...args: any[]) {
      super(...args);
      const params: LoggerServiceDependencies = args[0];
      this.logger = params.logger;
    }

    loggerInfo(message: string, data?: any) {
      return this.logger.info(message, data);
    }

    loggerErro(message: string, data?: any) {
      return this.logger.error(message, data);
    }
  };
}