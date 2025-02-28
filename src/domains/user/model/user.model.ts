import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import mysql from '../../../infra/database/connection/mysql';

class UserModel extends Model {
  id!: number;
  uuid!: string;
  name!: string;
  email!: string;
  password!: string;
  created_at!: Date;
  updated_at!: Date;
}

UserModel.init(
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
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: mysql,
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

export { UserModel };
