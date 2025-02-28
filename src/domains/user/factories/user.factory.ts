import bcrypt from 'bcryptjs';
// import { UserService } from '../services/user.service';
// import { UserController } from '../controller/user.controllers';
// import { UserRepository } from '../repositories/user.repository';
// import { UserModel } from '../model/user.model';
import logger from '../../../config/logger';
// import { Presenter } from '../../../protocols/presenter';
// import { EncryptionAdapter } from '../adapter/encryption.adapter';
// import { TokenAdapter } from '../adapter/token.adapter';

import { UserRepository } from '../repositories/user.repository';
import { UserGateway } from '../gateways/user.gateway';
import { UserService } from '../services/user.service';
import { CreateUserUseCase } from '../use-cases/create.user.usecase';
// import { GetUsersUseCase } from '../use-cases/create.user.usecase';
import { EncryptionAdapter } from '../adapter/encryption.adapter';
import { TokenAdapter } from '../adapter/token.adapter';
 import { UserModel } from '../model/user.model';
import { IUserGateway, UserGatewayParams } from '../interfaces/user.interface';
import { UserController } from '../controller/user.controllers';
import { Presenter } from '../../../protocols/presenter';

// Configuração do repositório
const userRepository = new UserRepository({ model: UserModel });

// Configuração dos adapters
const encryptionAdapter = new EncryptionAdapter({ bcrypt });
const tokenAdapter = new TokenAdapter();

// Configuração do gateway
const gateway: UserGatewayParams = {
  repository: userRepository,
  adapters: {
    encryption: encryptionAdapter,
    token: tokenAdapter,
  },
  logger
}

const userGateway = new UserGateway(gateway);

// Configuração do serviço
// const userService = new UserService(userGateway);

// Configuração dos use-cases
const presenter = new Presenter();
const createUserUseCase = new CreateUserUseCase(userGateway, presenter);
// const getUsersUseCase = new GetUsersUseCase(userGateway);


const userController = new UserController({ useCases: {createUser: createUserUseCase}});

// Exportação das instâncias
export {
  userRepository,
  userGateway,
  // userService,
  createUserUseCase,
  userController
  // getUsersUseCase,
};