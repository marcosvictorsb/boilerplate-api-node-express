
import 'dotenv/config';
import app from './app';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import logger from './src/config/logger'

const PORT: number | string =  process.env.PORT || 3000;


app.listen(PORT, () => {
  logger.info(`SERVER RUNNING ON PORT ${PORT}`);
});

app.use((request: Request, response: Response, next: NextFunction) => {
  const requestId = uuidv4();
  request.headers['x-request-id'] = requestId;

  const start = Date.now();
  logger.info(`Request iniciado - ID: ${requestId}, Método: ${request.method}, URL: ${request.url}`);

  response.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`Request finalizado - ID: ${requestId}, Método: ${request.method}, URL: ${request.url}, Status: ${response.statusCode}, Duração: ${duration}ms`);
  });

  next(); 
})