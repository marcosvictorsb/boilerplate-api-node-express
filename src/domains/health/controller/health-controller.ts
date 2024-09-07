import { Request, Response } from 'express';
import IController from '../../../interfaces/base-controller';
import logger from '../../../config/logger';


interface HealthControllerParams {
  service?: {
    health: () => Promise<{ status: number; body: any }>;
  };
  logger?: typeof logger;
}

interface ErrorHandlerParams {
  status?: number;
  [key: string]: any;
}

class HealthController extends IController {
  private service?: {
    health: () => Promise<{ status: number; body: any }>;
  };
  private logger: typeof logger;

  constructor(params: HealthControllerParams = {}) {
    super();
    this.service = params.service;
    this.logger = params.logger || logger;
  }

  public async health(request: Request, response: Response): Promise<Response> {
    try {
      if (!this.service) {
        throw new Error('Service is not defined');
      }

      const result = await this.service.health();
      return response.status(result.status).json(result.body);
    } catch (error) {
      this.logger.error(`${error}, error`);
      return this.errorHandler(error, request, response);
    }
  }
}

export default HealthController;
