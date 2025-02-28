import logger from '../../../config/logger';
import { IAdapterToken } from '../adapter/token.adapter';
import { IUserRepository } from '../../user/interfaces/user.interface';
import { IAdapterEncryption } from '../adapter/encryption.adapter';
import { Presenter } from '../../../protocols/presenter';

type AuthenticationServiceGateway = {
  logger: typeof logger;
  userRepository: IUserRepository;
  adapterToken: IAdapterToken;
  adapterEncryption: IAdapterEncryption;
}

interface AuthenticationServiceParams {    
  presenter: Presenter;
  gateway: AuthenticationServiceGateway;
}

export interface IAuthenticationService {
  authenticate(email: string, password: string): Promise<any>;
  register(name: string, email: string, password: string): Promise<any>;
  // isCorretPassword(password: string, userPassword: string): boolean;
}

export class AuthenticationService implements IAuthenticationService { 
  private gateway: AuthenticationServiceGateway;
  private presenter: Presenter  

  constructor(params: AuthenticationServiceParams) {    
    this.gateway = params.gateway;
    this.presenter = params.presenter;
  }

  private isCorretPassword(password: string, userPassword: string): boolean {
    return this.gateway.adapterEncryption.comparePasswords(password, userPassword) || false;
  }

  public async authenticate(email: string, password: string): Promise<any> {
    try {
      this.gateway.logger.info(`Iniciando a busca pelo usuário com o email: ${email}`);

      const user = await this.gateway.userRepository.find({ email });
      if (!user) {
        this.gateway.logger.info(`Não encontrado usuário com esse email: ${email}`);
        return this.presenter.conflict('Email ou senha está incorreto');
      }

      if (!user.password) {
        this.gateway.logger.info('Senha do usuário não encontrada');
        return this.presenter.conflict('Email ou senha está incorreto');
      }
      
      const isCorretPassword = this.isCorretPassword(password, user.password);
      if (!isCorretPassword) {
        this.gateway.logger.info('Email está incorreto');
        return this.presenter.conflict('Email ou senha está incorreto');
      }

      const credential = this.gateway.adapterToken.sign(user);
      return this.presenter.OK({name: user.name, email: user.email, token: credential});
    } catch (error: any) {
      this.gateway.logger.error('Falha na autenticação' , {message: error.message});
      return this.presenter.conflict('Email ou senha está incorreto');
    }
  }

  public async register(name: string, email: string, password: string): Promise<any> {  
    try {
      const user = await this.gateway.userRepository.find({ email });
      if (user) {
        this.gateway.logger?.info(`O ${email} já está cadastrado no banco de dados`);
        return this.presenter.conflict('Email já está em uso');
      }

      const newUser = {
        name,
        email,
        password: this.gateway.adapterEncryption.generateHashPassword(password),
      };

      const userCreated = await this.gateway.userRepository.create(newUser);
      if (!userCreated) {
        this.gateway.logger.info('Falha ao criar o usuário');
        return this.presenter.conflict('Aconteceu uma falha ao criar o usuário');
      }

      return this.presenter.created(userCreated);  
    } catch (error) {
      this.gateway.logger.error('Falha ao registar o usuário:', error);
      return this.presenter.serverError();
    }  
    
  }
}
