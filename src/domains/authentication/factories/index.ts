import bcrypt from 'bcryptjs';
import logger from '../../../config/logger';
import { AdapterEncryption } from '../adapter/encryption.adapter';
import {AdapterToken} from '../adapter/token.adapter';
import { Presenter } from '../../../protocols/presenter';
import {AuthenticationController} from '../controllers/authentication.controller';
import {  getRepositoryUser } from '../../user/factories/index';
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
    userRepository: getRepositoryUser(),
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
