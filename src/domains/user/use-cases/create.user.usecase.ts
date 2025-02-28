import { IUserGateway } from '../interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';
import { IPresenter } from '../../../protocols/presenter';
import { HttpResponse } from '../../../protocols/http';

export class CreateUserUseCase {
  constructor(private readonly gateway: IUserGateway, private presenter: IPresenter) {}

  async execute(email: string, password: string): Promise<HttpResponse> {
    this.gateway.loggerInfo('Creating user', { email });


    const existingUser = await this.gateway.findUserByEmail(email);
    if (existingUser) {
      this.gateway.loggerInfo('Usuario já existe para esse email', email);
      return this.presenter.conflict('Usuário já existe');
    }

    const userCreated = await this.gateway.createUser({ email, password });
    if(!userCreated) {
      this.gateway.loggerInfo('Erro ao criar usuário', email);
      return this.presenter.serverError('Erro ao criar usuário');
    }

    return this.presenter.OK();
  }
}