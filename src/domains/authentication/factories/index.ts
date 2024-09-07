import AuthenticationController from '../controller/authentication-controller';
import {AuthenticationService, IAuthenticationService} from '../service/authentication-service';
import { getServiceUser } from '../../users/factories/index';
import { IUserService } from '../../users/services/userService';
import logger from '../../../config/logger';
import {AdapterToken, IAdapterToken} from '../adapter/adapterToken';
import { HttpResponseHandler } from '../../../protocols/HttpResponseHandler';

interface ServiceParams {
  customerService?: IUserService;
  logger?: typeof logger;
  adapterToken?: IAdapterToken;
  httpResponseHandler?: HttpResponseHandler;
}

interface ControllerParams {
  serviceAuth?: IAuthenticationService;
  userService?: IUserService;
  logger?: typeof logger;
  adapterToken?: IAdapterToken
}

const getServiceAuthentication = (params: ServiceParams = {}): AuthenticationService => {
  return new AuthenticationService({
    userService: params.customerService || getServiceUser(),
    logger: params.logger || logger,
    adapterToken: params.adapterToken || new AdapterToken(),
    httpResponseHandler: params.httpResponseHandler || new HttpResponseHandler(),
  });
};

const getControllerAuthentication = (params: ControllerParams = {}): AuthenticationController => {
  return new AuthenticationController({
    serviceAuth: params.serviceAuth || getServiceAuthentication(),
    userService: params.userService || getServiceUser(),
    logger: params.logger || logger,
    adapterToken: params.adapterToken || new AdapterToken(),
  });
};



export {
  getControllerAuthentication,
  getServiceAuthentication,
};
