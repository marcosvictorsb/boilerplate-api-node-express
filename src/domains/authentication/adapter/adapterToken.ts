import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

interface User {
  [key: string]: any;
}

export interface IAdapterToken {
  sign(user: User): string;
}

export class AdapterToken implements IAdapterToken{
  public sign(user: User): string {
    const secret = process.env.JWT_SECRET_SIGN as string;
    const expiration = process.env.ONE_DAY_EXPIRATION as string;

    const token = jwt.sign(user, secret, {
      expiresIn: expiration,
    });

    return token;
  }
}



