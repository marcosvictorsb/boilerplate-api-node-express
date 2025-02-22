import logger from '../../../config/logger';
import 'dotenv/config';
import { Sequelize } from 'sequelize';

let sequelize: Sequelize;

const env = process.env.NODE_ENV;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbName = process.env.DB_NAME as string;
const host = process.env.DB_HOST as string;
const dialect = process.env.DB_DIALECT as string;
const dbUri = process.env.DB_URI as string;


logger.info('BANCO DE DADOS --> DESENVOLVIMENTO');
sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: dialect as any, 
  host,
});

export default sequelize;
