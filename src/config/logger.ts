import { createLogger, format, transports, Logger } from 'winston';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

const logLevels: Record<string, number> = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const logFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  format.printf(({ timestamp, level, message, request_id, method, path, status, duration, ...meta }) => {
    const cleanLevel = level.replace(/\u001b\[[0-9;]*m/g, '');
    const logObject = {
      timestamp,
      level: cleanLevel,
      request_id,
      method,
      path,
      status,
      duration,
      msg: message,
      ...meta,
    };
    return `${timestamp} [${level}]: ${JSON.stringify(logObject, null, 2)}`;
  })
);

const logger: Logger = createLogger({
  levels: logLevels,
  format: logFormat,
  transports: [new transports.Console()],
});

export const setupRequestLogging = (request: Request, response: Response, next: NextFunction) => {
  const requestId = uuidv4();
  request.headers['x-request-id'] = requestId;

  const start = Date.now();

  logger.info(`🚀 Request iniciado`, {
    request_id: requestId,
    method: request.method,
    path: request.url,
  });

  // Log de diagnóstico para verificar se a execução chega até aqui
  logger.debug(`Request processing started for ${request.method} ${request.url}`);

  response.on('finish', () => {
    const duration = `${Date.now() - start}ms`;
    logger.info(`✅ Request finalizado`, {
      request_id: requestId,
      method: request.method,
      path: request.url,
      status: response.statusCode,
      duration,
    });
  });

  next();
};

export default logger;
