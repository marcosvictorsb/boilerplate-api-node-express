import { IUserRepository  } from '../repositories/user.repository';
import { Presenter } from '../../../protocols/presenter';
import logger from '../../../config/logger';
import { IToken } from '../adapter/token.adapter';
import { IEncryption  } from '../adapter/encryption.adapter';
import { UserAttributes, UserModel } from '../model/user.model';

interface Gateway {
  logger: typeof logger;
  encryption: IEncryption;
  token: IToken;
}

interface UserServiceParams {
  repository: IUserRepository;
  presenter: Presenter;
  gateway: Gateway;
}

interface UserCreateParams {
  email: string;
  password: string;
}

interface FindCriteria {
  email?: string;
}


export interface IUserService {
  create(params: UserCreateParams): Promise<any>;
  getUsers(params: any): Promise<Response>;
  getUser(params: FindCriteria): Promise<UserAttributes>;
  // isComparePasswords(password: string, userPassword: string): boolean;
  // forgetPassword(emailCustomer: string): Promise<any>;
}

const FIRST_POSITION = 0;

export class UserService implements IUserService {
  private repository: IUserRepository;
  private presenter: Presenter;
  private gateway: Gateway;

  constructor(params: UserServiceParams) {
    this.repository = params.repository;
    this.presenter = params.presenter;
    this.gateway = params.gateway;
  }

  public async create(data: UserCreateParams): Promise<any> { 
    try {
      const { email, password } = data;
    
      const user = await this.repository.getUser({ email }); 
      if(user) {
        this.gateway.logger.info(`Já existe um usuário com esse email: ${email}`);
        return this.presenter.conflict(`Já existe um usuário com esse email: ${email}`);
      }  
  
      const newUser = {
        email,
        password: this.gateway.encryption.generateHashPassword(password),
      };  
      const userCreated = await this.repository.create(newUser);
      if (!userCreated) {
        this.gateway.logger.info('Falha ao criar o usuário');
        return this.presenter.conflict('Falha ao criar o usuário');
      }
  
      return this.presenter.created({
        email: userCreated.email,
        id: userCreated.id,
      });
    } catch (error: any) {
      this.gateway.logger.error(error);
      return this.presenter.serverError('Falha ao criar o usuário')
    }    
  }


  public async getUsers(params: any): Promise<any> { 
    this.gateway.logger.info('Buscando usuários')
    const users = await this.repository.getUsers(params);
    if(!users) {
      this.gateway.logger.info('Não foi encontrado nenhum usuário')
      this.presenter.notFound('Não encontrado nenhum usuário')
    }
    return this.presenter.OK({ users, length: users.length });
  }

  public async getUser(params: FindCriteria): Promise<any> { 
    const users = await this.repository.getUser(params);
    if(!users) {
      this.gateway.logger.info('Usuário não encontrado')
      this.presenter.notFound('Usuário não encontrado')
    }
    return this.presenter.OK({ users });
  }

  // public isComparePasswords(password: string, userPassword: string): boolean {
  //   return this.adapterEncryption?.comparePasswords(password, userPassword) || false;
  // }

  // public async forgetPassword(emailCustomer: string): Promise<any> { 
  //   try {
  //     const result = await this.getByEmail(emailCustomer);
  //     const customer = result.body;
  //     if (!customer) {
  //       return this.Presenter.conflict('User not found');
  //     }
  //     const { name, email } = customer;
  //     // const sendEmail = await this.emailService.sendEmailForgetPassword(name, email);
  //     return this.Presenter.OK('sendEmail');
  //   } catch (error: any) {
  //     this.logger?.error('[CUSTOMER SERVICE] - error to get user by email');
  //     return this.Presenter.serverError(error.message);
  //   }
  // }
}
