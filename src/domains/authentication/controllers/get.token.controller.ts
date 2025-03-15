import { Request, Response } from 'express';
import { GetTokenDependencies, GetTokenUseCases } from '../interfaces';


export class GetTokenController {
  private interactor: GetTokenUseCases;

  constructor(params: GetTokenDependencies) {
    this.interactor = params.interactor;
  }

  public async getToken(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const result = await this.interactor.execute(email, password);
    return response.status(result.status).json(result);
  }
}

