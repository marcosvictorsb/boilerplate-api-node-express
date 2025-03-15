import { GetTokenMixed } from "../../../adapters/gateways";
import { UserEntity } from "../../user/entities/user.entity"
import { FindCriteria, IUserRepository } from "../../user/interfaces"
import { IAuthenticationGatewayDependencies, IGetTokenGateway } from "../interfaces";



export class GetTokenGateway extends GetTokenMixed implements IGetTokenGateway {
  user: IUserRepository

  constructor(params: IAuthenticationGatewayDependencies) {
    super(params)
    this.user = params.repositories.user
  }

  async findUser(criteria: FindCriteria): Promise<UserEntity | null> {
    return await this.user.find(criteria) ?? null;
  }
}