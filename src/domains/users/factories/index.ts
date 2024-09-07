import bcrypt from 'bcryptjs';
import { IUserService, UserService } from '../services/userService';
import CustomerController from '../controller/userControllers';
import { UserRepository } from '../repositories/userRepository';
import { AdapterEncryption } from '../adapter/adapterEncryption';
import { AdapterToken } from '../../authentication/adapter/adapterToken';
import CustomerModel from '../model/userModel';
import logger from '../../../config/logger';
import { HttpResponseHandler } from '../../../protocols/HttpResponseHandler';

interface RepositoryParams {
  httpResponseHandler?: HttpResponseHandler;
}

interface ServiceParams {
  repository?: UserRepository;
  logger?: typeof logger;
  adapterEncryption?: AdapterEncryption;
  adapterToken?: AdapterToken;
  httpResponseHandler?: HttpResponseHandler;
}

interface ControllerParams {
  service?: IUserService;
  logger?: typeof logger;
}

const getRepositoryUser = (params: RepositoryParams = {}): UserRepository => {
  return new UserRepository({
    logger,
    model: CustomerModel,
    httpResponseHandler: params.httpResponseHandler || new HttpResponseHandler(),
  });
};

const getServiceUser = (params: ServiceParams = {}): UserService => {
  return new UserService({
    repository: params.repository || getRepositoryUser(),
    logger: params.logger || logger,
    adapterEncryption: params.adapterEncryption || new AdapterEncryption({ bcrypt }),
    adapterToken: params.adapterToken || new AdapterToken(),
    httpResponseHandler: params.httpResponseHandler || new HttpResponseHandler(),
  });
};

const getControllerUser = (params: ControllerParams = {}): CustomerController => {
  return new CustomerController({
    service: params.service || getServiceUser(),
    logger: params.logger || logger,
  });
};

export {
  getControllerUser,
  getServiceUser,
  getRepositoryUser
};
