import { Request, Response } from 'express';
import { CreateUserInteractor } from '../usecases/create.user.interactor';
import { UserControllerParams } from '../interfaces/user.interface';

interface IUserController {
  create(request: Request, response: Response): Promise<Response>;
  // getUsers(request: Request, response: Response): Promise<Response>;
  // forgetPassword(request: Request, response: Response): Promise<Response>
}

export class UserController implements IUserController{
  protected createUser: CreateUserInteractor;

  constructor(params: UserControllerParams) {
    this.createUser = params.useCases.createUser;
  }

  public async create(request: Request, response: Response): Promise<Response> {  
    const { email, password } = request.body; 
    const result = await this.createUser.execute(email, password);
    return response.status(result.status).json(result.body);   
  }
}

