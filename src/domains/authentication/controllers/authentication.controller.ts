import { Request, Response } from 'express';
import { IAuthenticationService } from '../services/authentication.services';
import logger from '../../../config/logger';

type GatewayAuthentication = {
  logger: typeof logger
}

interface AuthenticationControllerParams {
  service: IAuthenticationService;
  gateway: GatewayAuthentication;
}

export class AuthenticationController {
  private service: IAuthenticationService;
  private gateway: GatewayAuthentication;

  constructor(params: AuthenticationControllerParams) {
    this.service = params.service;
    this.gateway = params.gateway;
  }

  public async authenticate(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    this.gateway.logger.info(`AuthenticationController: authenticate`);
    const result = await this.service.authenticate(email, password);
    return response.status(result.status).json(result);
  }

  public async register(request: Request, response: Response): Promise<Response> {
    const { email, password, name } = request.body;
    const result = await this.service.register(name, email, password);
    return response.status(result.status).json(result.body);
  }
}

