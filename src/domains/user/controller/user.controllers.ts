import { Request, Response } from 'express';
import { IUserService } from '../services/user.service';

interface UserControllerParams {
  service: IUserService;
}

interface IUserController {
  create(request: Request, response: Response): Promise<Response>;
  getUsers(request: Request, response: Response): Promise<Response>;
  // forgetPassword(request: Request, response: Response): Promise<Response>
}

export class UserController implements IUserController{
  protected service: IUserService;

  constructor(params: UserControllerParams) {
    this.service = params.service;
  }

  public async create(request: Request, response: Response): Promise<Response> {   
    const result = await this.service.create(request.body);
    return response.status(result.status).json(result.body);   
  }

  public async getUsers(request: Request, response: Response): Promise<Response> {   
    const result = await this.service.getUsers(request.body);
    return response.status(result.status).json(result.body);   
  }


  // public async forgetPassword(request: Request, response: Response): Promise<Response> {   
  //   const { email } = request.query as { email?: string };
  //   if (!email) {
  //     return response.status(400).json({ message: 'Email query parameter is required' });
  //   }
  //   const result = await this.service.forgetPassword(email);
  //   return response.status(result.status).json(result.body);   
  // }
}

