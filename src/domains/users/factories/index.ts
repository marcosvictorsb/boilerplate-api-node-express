import bcrypt from 'bcryptjs';
import { IUserService, UserService } from '../services/userService';
import CustomerController from '../controller/userControllers';
import { UserRepository } from '../repositories/userRepository';
import { AdapterEncryption } from '../adapter/adapterEncryption';
import { AdapterToken } from '../../authentication/adapter/adapterToken';
import CustomerModel from '../model/userModel';
import logger from '../../../config/logger';
import { Response } from '../../../protocols/response';

const getRepositoryUser = (): UserRepository => {
  return new UserRepository({
    logger,
    model: CustomerModel,
    response: Response,
  });
};

const getServiceUser = (): UserService => {
  return new UserService({
    repository: getRepositoryUser(),
    logger: logger,
    adapterEncryption: new AdapterEncryption({ bcrypt }),
    adapterToken: new AdapterToken(),
    response: Response
  });
};

const getControllerUser = (): CustomerController => {
  return new CustomerController({
    service: getServiceUser(),
    logger: logger,
  });
};

export {
  getControllerUser,
  getServiceUser,
  getRepositoryUser
};
