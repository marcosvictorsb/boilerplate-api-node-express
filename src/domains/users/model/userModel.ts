import { DataTypes, Model, Optional } from 'sequelize';
import mysql from '../../../infra/database/connection/mysql';

interface UserAttributes {
  id: number;
  uuid: string;
  name?: string;
  email?: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class UserModal extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public uuid!: string;
  public name?: string;
  public email?: string;
  public password?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

UserModal.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: mysql,
    tableName: 'users',
    timestamps: true,
  }
);

export default UserModal;
