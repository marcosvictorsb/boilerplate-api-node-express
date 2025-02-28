import { Request, Response } from 'express';
import { CreateUserUseCase } from '../use-cases/create.user.usecase';
import { UserControllerParams } from '../interfaces/user.interface';

interface IUserController {
  create(request: Request, response: Response): Promise<Response>;
  // getUsers(request: Request, response: Response): Promise<Response>;
  // forgetPassword(request: Request, response: Response): Promise<Response>
}

export class UserController implements IUserController{
  protected createUser: CreateUserUseCase;

  constructor(params: UserControllerParams) {
    this.createUser = params.useCases.createUser;
  }

  public async create(request: Request, response: Response): Promise<Response> {  
    const { email, password } = request.body; 
    const result = await this.createUser.execute(email, password);
    return response.status(result.status).json(result.body);   
  }

  // public async getUsers(request: Request, response: Response): Promise<Response> {   
  //   const result = await this.service.getUsers(request.body);
  //   return response.status(result.status).json(result.body);   
  // }


  // public async forgetPassword(request: Request, response: Response): Promise<Response> {   
  //   const { email } = request.query as { email?: string };
  //   if (!email) {
  //     return response.status(400).json({ message: 'Email query parameter is required' });
  //   }
  //   const result = await this.service.forgetPassword(email);
  //   return response.status(result.status).json(result.body);   
  // }
}

