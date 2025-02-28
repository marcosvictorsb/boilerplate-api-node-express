import { UserModel } from '../model/user.model';
import { UserEntity } from '../entities/user.entity';
import { ModelStatic, Op } from 'sequelize';
import { DeleteCriteria, FindCriteria, IUserRepository, UpdateCriteria, UserRepositoryParams } from '../interfaces/user.interface';

export class UserRepository implements IUserRepository  {
  protected model: ModelStatic<UserModel> ;

  constructor(params: UserRepositoryParams) {
    this.model = params.model;
  }  

  private getConditions(criteria: FindCriteria): Record<string, any> {    
    const whereConditions: Record<string, any> = {};

    if (criteria.name) {
      whereConditions['name'] = criteria.name;
    }

    if (criteria.email) {
      whereConditions['email'] = criteria.email;
    }

    if (criteria.password) {
      whereConditions['password'] = criteria.password;
    }
  
    return whereConditions;
  }

  public async create(user: { email: string; password: string }): Promise<UserEntity> {
    const createdUser = await this.model.create(user);
    return new UserEntity(
      createdUser.id,
      createdUser.uuid,
      createdUser.email,
      createdUser.password,
      createdUser.created_at,
      createdUser.updated_at,
    );;
  }

  public async find(criteria: FindCriteria): Promise<UserEntity | null> {
    const user = await this.model.findOne({
      where: this.getConditions(criteria),
      raw: true,
    });

    if (!user) return null;

    return new UserEntity(
      user.id,
      user.email,
      user.uuid,
      user.password,
      user?.created_at,
      user.updated_at,
    );
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.model.findAll();
    return users.map(
      (user: any) =>
        new UserEntity(
          user.id,
          user.email,
          user.password,
          user.createdAt,
          user.updatedAt,
        ),
    );
  }

  public async update(criteria: UpdateCriteria, data: Partial<UserEntity>): Promise<UserEntity | null> {
    const [affectedRows] = await this.model.update(data, { where: { id: criteria.id } });
    if (affectedRows === 0) return null;

    const updatedUser = await this.model.findByPk(criteria.id);
    if (!updatedUser) return null;

    return new UserEntity(
      updatedUser.id,
      updatedUser.uuid,
      updatedUser.email,
      updatedUser.password,
      updatedUser.created_at,
      updatedUser.updated_at,
    );
  }

  public async delete(criteria: DeleteCriteria): Promise<boolean> {
    const affectedRows = await this.model.destroy({ where: { id: criteria.id } });
    return affectedRows > 0;
  }
}


