import { IEncryptionService, ILoggerMixin } from "../../../services"
import { UserEntity } from "../../user/entities/user.entity"
import { FindCriteria } from "../../user/interfaces"
import { IUserRepository } from "../../user/interfaces"
import { ITokenService } from "../../../services/token.service"
import { HttpResponse } from "../../../protocols/http"
import logger from "../../../config/logger"

export type IAuthenticationGatewayDependencies = {
  repositories: {
    user: IUserRepository
  },
  logger: typeof logger
}

export interface GetTokenUseCases  {
  execute(email: string, password: string): Promise<HttpResponse>
}

export type GetTokenDependencies = {
  interactor: GetTokenUseCases 
}


export interface IGetTokenGateway extends ILoggerMixin, ITokenService, IEncryptionService {
  findUser(criteria: FindCriteria): Promise<UserEntity | null>
}
