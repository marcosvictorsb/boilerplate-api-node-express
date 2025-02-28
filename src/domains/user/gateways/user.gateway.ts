import { FindCriteria, IUserRepository, IUserGateway, UserGatewayParams, IToken } from '../interfaces/user.interface';
import { IEncryption } from '../adapter/encryption.adapter';
import { UserEntity } from '../entities/user.entity';
import logger from '../../../config/logger';


export class UserGateway implements IUserGateway {
  userRepository: IUserRepository;
  encryption: IEncryption;
  token: IToken;
  logger: typeof logger;

  constructor(params: UserGatewayParams) {
    this.userRepository = params.repository;
    this.encryption = params.adapters.encryption;
    this.token = params.adapters.token;
    this.logger = params.logger;
  }

  async createUser(user: { email: string; password: string }): Promise<UserEntity> {
    const hashedPassword = this.encryption.generateHashPassword(user.password);
    return this.userRepository.create({ email: user.email, password: hashedPassword });
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.find({ email});
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  loggerInfo(message: string, data: any) {
    return this.logger.info(message, data);
  };
}