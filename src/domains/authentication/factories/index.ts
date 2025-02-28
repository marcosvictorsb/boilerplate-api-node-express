import bcrypt from 'bcryptjs';
import logger from '../../../config/logger';
import { AdapterEncryption } from '../adapter/encryption.adapter';
import {AdapterToken} from '../adapter/token.adapter';
import { Presenter } from '../../../protocols/presenter';
import {AuthenticationController} from '../controllers/authentication.controller';
import {  userRepository } from '../../user/factories/user.factory';
import {AuthenticationService } from '../services/authentication.services';


interface Gateway {
  logger: typeof logger;
  userRepository: any;
  adapterToken: any;
  adapterEncryption: any;
}

const getGateway = (): Gateway => {
  return {
    logger,
    userRepository: userRepository,
    adapterToken: new AdapterToken(),
    adapterEncryption: new AdapterEncryption({ bcrypt }),
  }
}

const getServiceAuthentication = (): AuthenticationService => {
  return new AuthenticationService({
    gateway: getGateway(),
    presenter: new Presenter(),
  });
};

const getControllerAuthentication = (): AuthenticationController => {
  return new AuthenticationController({
    service: getServiceAuthentication(),
    gateway: {
      logger
    }
  });
};


export {
  getControllerAuthentication,
  getServiceAuthentication,
};
