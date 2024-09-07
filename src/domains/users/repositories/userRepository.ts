import logger from '../../../config/logger';
import { HttpResponseHandler } from '../../../protocols/HttpResponseHandler';
import UserModel from '../model/userModel';

const FIRST_POSITION = 0;

interface UserRepositoryParams {
  logger: typeof logger;
  model: typeof UserModel; 
  httpResponseHandler: HttpResponseHandler;
}

export interface IUserRepository {
  create(User: any): Promise<any>;
  getByEmail(email: string): Promise<any>;
}

export class UserRepository implements IUserRepository {
  private logger: typeof logger;
  private readonly model: typeof UserModel;
  private httpResponseHandler: HttpResponseHandler;

  constructor(params: UserRepositoryParams) {
    this.logger = params.logger || logger;;
    this.model = params.model || UserModel;
    this.httpResponseHandler = params.httpResponseHandler;
  }

  public async create(User: any): Promise<any> {
    try {
      const UserCreated = await this.model.create(User);
      return UserCreated.dataValues;
    } catch (error: any) {
      this.logger.error('[User REPOSITORY] - error to create User');
      return this.httpResponseHandler.serverError(error.message);
    }
  }

  public async getByEmail(email: string): Promise<any> {
    try {
      const users = await this.model.findAll({ where: { email }, raw: true });
      return users[FIRST_POSITION];
    } catch (error: any) {
      this.logger.error('[User REPOSITORY] - Não encontrado usuário com esse email', error);
      return this.httpResponseHandler.serverError(error.message);
    }
  }  
}


