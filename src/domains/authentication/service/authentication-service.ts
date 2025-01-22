import logger from '../../../config/logger';
import { Response } from '../../../protocols/response';
import { getServiceUser } from '../../users/factories';
import { IUserService } from '../../users/services/userService';
import { IAdapterToken } from '../adapter/adapterToken';

interface AuthenticationServiceParams {
  userService: IUserService
  logger: typeof logger;
  adapterToken: IAdapterToken;
  response: typeof Response;
}

export interface IAuthenticationService {
  authenticate(email: string, password: string): Promise<any>;
}

export class AuthenticationService { 
  private userService: IUserService;
  private logger: typeof logger;
  private adapterToken: IAdapterToken;;
  private response: typeof Response;

  constructor(params: AuthenticationServiceParams) {
    this.userService = params.userService; 
    this.logger = params.logger; 
    this.adapterToken = params.adapterToken;
    this.response = params.response; 
  }

  public async authenticate(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.getByEmail(email);
      if (!user) {
        this.logger.info(`[Authentication Service]: Não encontrado usuário com esse email: ${email}`);
        return this.response.conflict('Email ou senha está incorreto');
      }
      const isCompare = this.userService.isComparePasswords(password, user.password);
      if (!isCompare) {
        this.logger.info('[Authentication Service] - Email está incorreto');
        return this.response.conflict('Email ou senha está incorreto');
      }
      
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      const credential = this.adapterToken?.sign(user);
      user.token = credential;
      return this.response.ok({ user });
    } catch (error: any) {
      this.logger.error('[AuthenticationService] - falha na autenticação' , {message: error.message});
      return this.response.conflict('Email ou senha está incorreto');
    }
  }
}
