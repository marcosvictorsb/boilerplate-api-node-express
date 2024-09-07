import { Request, Response } from 'express';
import Controller from '../../../interfaces/base-controller';
import { IAuthenticationService } from '../service/authentication-service';
import { IUserService } from '../../users/services/userService';
import {AdapterToken, IAdapterToken} from '../adapter/adapterToken';
import logger from '../../../config/logger';

interface AuthenticationControllerParams {
  serviceAuth: IAuthenticationService;
  userService: IUserService;
  logger: typeof logger;
  adapterToken: IAdapterToken,
}

class AuthenticationController extends Controller {
  private serviceAuth: IAuthenticationService;
  private userService: IUserService;
  private logger: typeof logger;
  private adapterToken: IAdapterToken;

  constructor(params: AuthenticationControllerParams) {
    super();
    this.serviceAuth = params.serviceAuth;
    this.userService = params.userService;
    this.logger = params.logger || logger;
    this.adapterToken = params.adapterToken || new AdapterToken()
  }

  public async authenticate(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;
      const result = await this.serviceAuth.authenticate(email, password);
      return response.status(result.status).json(result.body);
    } catch (error) {
      return this.errorHandler(error, request, response);
    }
  }

  public async register(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;
      const result = await this.userService.create(email, password);
      return response.status(result.status).json(result.body);
    } catch (error) {
      return this.errorHandler(error, request, response);
    }
  }
}

export default AuthenticationController;
