import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

interface User {
  [key: string]: any;
}

export interface IToken {
  sign(user: User, secret: string, options: any): string;
}

export class TokenAdapter implements IToken{
  public sign(user: User): string {
    const secret = process.env.JWT_SECRET_SIGN as string;
    const expiration = parseInt(process.env.ONE_DAY_EXPIRATION as string, 10);

    const token = jwt.sign(user, secret, {
      expiresIn: expiration,
    });

    return token;
  }
}