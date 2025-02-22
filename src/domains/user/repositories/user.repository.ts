import { UserModel, UserAttributes } from '../model/user.model';
import { ModelStatic, Op } from 'sequelize';

const FIRST_POSITION = 0;

interface UserRepositoryParams {
  model: ModelStatic<UserModel>; 
}

export interface IUserRepository {
  create(User: any): Promise<UserModel | null>;
  getUser(criteria: FindCriteria): Promise<UserModel | null>;
  getUsers(criteria: FindCriteria): Promise<UserModel[]>;
}

interface FindCriteria {
  name?: string;
  email?: string;
  password?: string;
}

export class UserRepository implements IUserRepository  {
  protected model: ModelStatic<UserModel> ;

  constructor(params: UserRepositoryParams) {
    this.model = params.model;
  }

  private getConditions(criteria: FindCriteria): Record<string, any> {
    const { name, email, password } = criteria
    const whereConditions: Record<string, any> = {};

    if (name) {
      whereConditions['name'] = name
    }

    if (email) {
      whereConditions['email'] = email
    }

    if (password) {
      whereConditions['password'] = password;
    }
  
    return whereConditions;
  }

  public async create(User: any): Promise<UserModel | null> {
    const userCreated = await this.model.create(User);
    return userCreated;
  }

  public async getUser(criteria: FindCriteria): Promise<UserModel | null> {
    const user = await this.model.findOne({
      where: this.getConditions(criteria),
      raw: true,
    });

    return user ? user : null;
  }

  public async getUsers(criteria: any): Promise<any | null> {
    return this.model.findAll({
      where: this.getConditions(criteria),
      attributes: {exclude: ['password']},
      raw: true
    });
  }

  // public async update(id: number, data: Partial<T>): Promise<T[]> {
  //   return this.model.update(data, {
  //     where: { id },
  //     returning: true,
  //   });
  // }

  // public async delete(id: number): Promise<number> {
  //   return this.model.destroy({
  //     where: { id },
  //   });
  // }
}


