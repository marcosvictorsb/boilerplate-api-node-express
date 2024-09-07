import { Request, Response } from 'express';
import Controller from '../../../interfaces/base-controller';
import { IUserService } from '../services/userService';
import logger from '../../../config/logger';
import { getServiceUser } from '../factories';

interface CustomerControllerParams {
  service: IUserService;
  logger: typeof logger;
}

class CustomerController extends Controller {
  private service: IUserService;
  private logger: typeof logger;

  constructor(params: CustomerControllerParams) {
    super();
    this.service = params.service || getServiceUser();
    this.logger = params.logger;
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;
      const result = await this.service.create(email, password);
      return response.status(result.status).json(result.body);
    } catch (error) {
      this.logger.error(`[CUSTOMER CONTROLLER] - erro ao criar o usuario`, error);
      return this.errorHandler(error, request, response);
    }
  }

  public async getByEmail(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.query as { email?: string };
      if (!email) {
        return response.status(400).json({ message: 'Email query parameter is required' });
      }
      const result = await this.service.getByEmail(email);
      return response.status(result.status).json(result.body);
    } catch (error: any) {
      this.logger.error(`[CUSTOMER CONTROLLER] - Erro ao buscar o usuário por email: ${error.message}`);
      return this.errorHandler(error, request, response);
    }
  }

  public async forgetPassword(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.query as { email?: string };
      if (!email) {
        return response.status(400).json({ message: 'Email query parameter is required' });
      }
      const result = await this.service.forgetPassword(email);
      return response.status(result.status).json(result.body);
    } catch (error: any) {
      this.logger.error(`[CUSTOMER CONTROLLER] - Erro para trocar a senha ${error.message}`);
      return this.errorHandler(error, request, response);
    }
  }
}

export default CustomerController;
