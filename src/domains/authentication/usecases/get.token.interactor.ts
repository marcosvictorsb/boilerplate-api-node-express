import { IPresenter, HttpResponse } from "../../../protocols/presenter";
import { IGetTokenGateway } from "../interfaces";

export class GetTokenInteractor {
  constructor(private readonly gateway: IGetTokenGateway, private presenter: IPresenter ) {}

  async execute(email: string, password: string): Promise<HttpResponse> {
    try {
      this.gateway.loggerInfo(`Iniciando a busca pelo usuário com o email: ${email}`);
      
      const user = await this.gateway.findUser({ email });      
      if(!user) {
        this.gateway.loggerInfo(`Não encontrado usuário com esse email: ${email}`);
        return this.presenter.conflict('Email ou senha está incorreto');
      }

      if (!user.password) {
        this.gateway.loggerInfo('Senha do usuário não encontrada');
        return this.presenter.conflict('Email ou senha está incorreto');
      }
      
      const isCorretPassword = this.isCorretPassword(password, user.password);
      if (!isCorretPassword) {
        this.gateway.loggerInfo('Email está incorreto');
        return this.presenter.conflict('Email ou senha está incorreto');
      }

      const credential = this.gateway.sign(user);
      return this.presenter.OK({name: user.name, email: user.email, token: credential});
      
    } catch (error) {
      this.gateway.loggerErro('Error ao buscar o token', error);
      return this.presenter.serverError('');
    }
  }

  private isCorretPassword(password: string, userPassword: string): boolean {
    return this.gateway.comparePasswords(password, userPassword) || false;
  }
}