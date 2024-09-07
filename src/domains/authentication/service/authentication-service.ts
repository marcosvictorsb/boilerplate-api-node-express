import logger from '../../../config/logger';
import { HttpResponseHandler } from '../../../protocols/HttpResponseHandler';
import { getServiceUser } from '../../users/factories';
import { IUserService } from '../../users/services/userService';

interface AuthenticationServiceParams {
  userService?: IUserService
  logger?: typeof logger;
  adapterToken?: {
    sign: (user: any) => string; 
  };
  httpResponseHandler?: HttpResponseHandler;
}

export interface IAuthenticationService {
  authenticate(email: string, password: string): Promise<any>;
}

export class AuthenticationService { 
  private userService: IUserService;
  private logger: typeof logger;
  private adapterToken?: {
    sign: (user: any) => string; 
  };
  private httpResponseHandler: HttpResponseHandler;

  constructor(params: AuthenticationServiceParams = {}) {
    this.userService = params.userService || getServiceUser();
    this.logger = params.logger || logger;
    this.adapterToken = params.adapterToken;
    this.httpResponseHandler = params.httpResponseHandler  || new HttpResponseHandler();
  }

  public async authenticate(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.getByEmail(email);
      if (!user) {
        this.logger.info(`[Authentication Service]: Não encontrado usuário com esse email: ${email}`);
        return this.httpResponseHandler.conflict('Email ou senha está incorreto');
      }
      const isCompare = this.userService.isComparePasswords(password, user.password);
      if (!isCompare) {
        this.logger.info('[Authentication Service] - Email está incorreto');
        return this.httpResponseHandler.conflict('Email ou senha está incorreto');
      }
      
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      const credential = this.adapterToken?.sign(user);
      user.token = credential;
      return this.httpResponseHandler.OK({ user });
    } catch (error: any) {
      this.logger.error('[AuthenticationService] - falha na autenticação' , {message: error.message});
      return this.httpResponseHandler.conflict('Email ou senha está incorreto');
    }
  }
}
