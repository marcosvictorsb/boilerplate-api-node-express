import { Request, Response } from 'express';
import IController from '../../../interfaces/base-controller';
import logger from '../../../config/logger';
import HealthService, { IHealthService } from '../services/health-service';


interface HealthControllerParams {
  service: IHealthService;
  logger: typeof logger;
}

interface ErrorHandlerParams {
  status?: number;
  [key: string]: any;
}

class HealthController extends IController {
  private service: IHealthService
  private logger: typeof logger;

  constructor(params: HealthControllerParams) {
    super();
    this.service = params.service;
    this.logger = params.logger;
  }

  public async health(request: Request, response: Response): Promise<Response> {
    try {
      const result = await this.service.health();
      return response.status(result.status).json(result.body);
    } catch (error) {
      this.logger.error(`${error}, error`);
      return this.errorHandler(error, request, response);
    }
  }
}

export default HealthController;
