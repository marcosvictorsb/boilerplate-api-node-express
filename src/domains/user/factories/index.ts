import bcrypt from 'bcryptjs';
import { UserService } from '../services/user.service';
import { UserController } from '../controller/user.controllers';
import { UserRepository } from '../repositories/user.repository';
import { UserModel } from '../model/user.model';
import logger from '../../../config/logger';
import { Presenter } from '../../../protocols/presenter';
import { EncryptionAdapter } from '../adapter/encryption.adapter';
import { TokenAdapter } from '../adapter/token.adapter';


const getGateway = () => {
  return {
    logger,
    encryption: new EncryptionAdapter({ bcrypt }),
    token: new TokenAdapter(),
  };
};

const getRepositoryUser = (): UserRepository => {
  return new UserRepository({
    model: UserModel,
  });
};

const getServiceUser = (): UserService => {
  return new UserService({
    repository: getRepositoryUser(),    
    gateway: getGateway(),
    presenter: new Presenter(),
  });
};

const getControllerUser = (): UserController => {
  return new UserController({
    service: getServiceUser(),
  });
};

export {
  getControllerUser,
  getServiceUser,
  getRepositoryUser
};
