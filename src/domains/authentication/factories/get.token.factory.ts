import { UserRepository } from "../../user/repositories/user.repository"
import { GetTokenGateway } from "../gateways/get.token.gateway"
import { GetTokenInteractor } from "../usecases/get.token.interactor"
import { UserModel } from "./../../../domains/user/model/user.model"
import { Presenter } from "../../../protocols/presenter"
import { GetTokenDependencies, IAuthenticationGatewayDependencies } from "../interfaces"
import { GetTokenController } from "../controllers/get.token.controller"
import logger from "../../../config/logger"

const repositories: IAuthenticationGatewayDependencies = {
  repositories: {
    user: new UserRepository({ model: UserModel })
  },
  logger
}

const presenter = new Presenter();


const getTokenGateway = new GetTokenGateway(repositories)
const getTokenInteractor = new GetTokenInteractor(getTokenGateway, presenter)

const useCases: GetTokenDependencies = {
  interactor: getTokenInteractor
}

export const getTokenController = new GetTokenController(useCases)