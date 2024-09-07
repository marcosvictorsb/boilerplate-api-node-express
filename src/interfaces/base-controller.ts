import logger from '../config/logger';
import { Request, Response } from 'express';

interface ErrorHandlerParams {
  status?: number;
  [key: string]: any;
}

class Controller {
  protected errorHandler: (error: any, request: Request, response: Response) => Response;

  constructor() {
    this.errorHandler = (error: any = {}, request: Request, response: Response): Response => {
      logger.error(error);
      return response.status(error.status || 400).json(error);
    };
  }
}

export default Controller;
