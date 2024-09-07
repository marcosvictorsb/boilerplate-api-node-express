import { Logger } from 'winston'; 
import bcrypt from 'bcryptjs';
import { HttpResponseHandler } from '../../../protocols/HttpResponseHandler';
import { IUserRepository  } from '../repositories/userRepository';
import {  IAdapterEncryption, AdapterEncryption } from './../adapter/adapterEncryption';
import {  AdapterToken, IAdapterToken } from '../../authentication/adapter/adapterToken';
import { getRepositoryUser } from '../factories';


interface UserServiceParams {
  repository: IUserRepository;
  logger: Logger;
  adapterEncryption: IAdapterEncryption;
  adapterToken: IAdapterToken;
  httpResponseHandler: HttpResponseHandler;
}

export interface IUserService {
  create(email: string, password: string): Promise<any>;
  getByEmail(email: string): Promise<any>;
  isComparePasswords(password: string, userPassword: string): boolean;
  forgetPassword(emailCustomer: string): Promise<any>;
}

export class UserService implements IUserService {
  private repository: IUserRepository;
  private logger: Logger;
  private adapterEncryption: IAdapterEncryption;
  private adapterToken: IAdapterToken;
  private httpResponseHandler: HttpResponseHandler;

  constructor(params: UserServiceParams) {
    this.repository = params.repository || getRepositoryUser(),
    this.logger = params.logger || Logger,
    this.adapterEncryption = params.adapterEncryption || new AdapterEncryption({ bcrypt }),
    this.adapterToken = params.adapterToken || new AdapterToken(),
    this.httpResponseHandler = params.httpResponseHandler || new HttpResponseHandler()
  }

  public async create(email: string, password: string ): Promise<any> {
    try {
      const customerExists = await this.repository.getByEmail(email);
      if (customerExists) {
        this.logger?.info('Email já está em uso');
        return this.httpResponseHandler.conflict('Email já está em uso');
      }

      const newCustomer = {
        email,
        password: this.adapterEncryption.generateHashPassword(password),
      };

      const customer = await this.repository.create(newCustomer);
      if (!customer) {
        this.logger?.info(`[CUSTOMER SERVICE] `);
        return this.httpResponseHandler.conflict('Error creating user');
      }

      const customerCreated = this.removePassword(customer);
      return this.httpResponseHandler.created('Usuário criado');
    } catch (error: any) {
      this.logger?.error('[CUSTOMER SERVICE] - error to create user');
      return this.httpResponseHandler?.serverError(error.message);
    }
  }

  private removePassword(customer: any): any { 
    customer.password = undefined;
    return customer;
  }

  public async getByEmail(email: string): Promise<any> { 
    try {
      const user = await this.repository.getByEmail(email);
      if (!user) {
        this.logger?.info(`[User SERVICE] - Não encontrado usuário com esse email: ${email}`);
        return this.httpResponseHandler.conflict('User not found');
      }
      return user;
    } catch (error: any) {
      this.logger?.error('[CUSTOMER SERVICE] - error to get user by email');
      return this.httpResponseHandler.serverError(error.message);
    }
  }

  public isComparePasswords(password: string, userPassword: string): boolean {
    return this.adapterEncryption?.comparePasswords(password, userPassword) || false;
  }

  public async forgetPassword(emailCustomer: string): Promise<any> { 
    try {
      const result = await this.getByEmail(emailCustomer);
      const customer = result.body;
      if (!customer) {
        return this.httpResponseHandler.conflict('User not found');
      }
      const { name, email } = customer;
      // const sendEmail = await this.emailService.sendEmailForgetPassword(name, email);
      return this.httpResponseHandler.OK('sendEmail');
    } catch (error: any) {
      this.logger?.error('[CUSTOMER SERVICE] - error to get user by email');
      return this.httpResponseHandler.serverError(error.message);
    }
  }
}
