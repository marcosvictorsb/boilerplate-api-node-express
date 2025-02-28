import { ModelStatic } from 'sequelize';
import { UserEntity as User } from '../entities/user.entity';
import { UserModel } from '../model/user.model';
import { IEncryption } from '../adapter/encryption.adapter';
import logger from '../../../config/logger';
import { CreateUserUseCase } from '../use-cases/create.user.usecase';

export type FindCriteria = {
  name?: string;
  email?: string;
  password?: string;
}

export type UpdateCriteria = {
  id: number
}

export type DeleteCriteria = {
  id: number
}

export type UserRepositoryParams = {
  model: ModelStatic<UserModel>; 
}

export type IToken = { 
  sign(user: User, secret: string, options: any): string;
}

export type UserGatewayParams = {
  repository: IUserRepository;
  adapters: {
    encryption: IEncryption;
    token: IToken;
  },
  logger: typeof logger

}

export interface UserControllerParams {
  useCases: {
    createUser: CreateUserUseCase
  };
}

export interface IUserGateway {
  createUser(user: { email: string; password: string }): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  // comparePasswords(plain: string, hashed: string): boolean;
  loggerInfo(message: string, data: any): any;
}

export interface IUserRepository {
  create(user: { email: string; password: string }): Promise<User>;
  find(criteria: FindCriteria): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(criteria: UpdateCriteria, data: Partial<User>): Promise<User | null>;
  delete(criteria: DeleteCriteria): Promise<boolean>;
}

