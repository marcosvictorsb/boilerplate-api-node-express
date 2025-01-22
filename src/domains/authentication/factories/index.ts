import AuthenticationController from '../controller/authentication-controller';
import {AuthenticationService} from '../service/authentication-service';
import { getServiceUser } from '../../users/factories/index';
import logger from '../../../config/logger';
import {AdapterToken} from '../adapter/adapterToken';
import { Response } from '../../../protocols/response';

const getServiceAuthentication = (): AuthenticationService => {
  return new AuthenticationService({
    userService: getServiceUser(),
    logger: logger,
    adapterToken: new AdapterToken(),
    response: Response,
  });
};

const getControllerAuthentication = (): AuthenticationController => {
  return new AuthenticationController({
    serviceAuth: getServiceAuthentication(),
    userService: getServiceUser(),
    logger: logger,
    adapterToken: new AdapterToken(),
  });
};


export {
  getControllerAuthentication,
  getServiceAuthentication,
};
