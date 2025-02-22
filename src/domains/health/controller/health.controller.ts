import { Request, Response } from 'express';
import IController from '../../../interfaces/base-controller';
import logger from '../../../config/logger';
import HealthService, { IHealthService } from '../services/health-service';


type HealthGateway = {
  logger: typeof logger;
}

type HealthControllerParams = {
  service: IHealthService;
  gateway: HealthGateway
}

export class HealthController {
  private service: IHealthService
  private gateway: HealthGateway;

  constructor(params: HealthControllerParams) {
    this.service = params.service;
    this.gateway = params.gateway;
  }

  public async health(request: Request, response: Response): Promise<Response>{
    this.gateway.logger.info('Health controller.health');
    const result = await this.service.health();
    return response.status(result.status).json(result.body);
  }
}
