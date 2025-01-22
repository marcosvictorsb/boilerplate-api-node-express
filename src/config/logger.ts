import { createLogger, format, transports, Logger } from 'winston';

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
  format.timestamp({
    format: 'DD-MM-YYYY HH:mm:ss',
  }),
  format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

const logger: Logger = createLogger({
  levels: logLevels,
  format: logFormat,
  transports: [new transports.Console()],
});


export default logger;
