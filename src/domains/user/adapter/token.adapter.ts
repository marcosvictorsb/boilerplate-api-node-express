import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IToken } from '../interfaces/user.interface';

dotenv.config();

interface User {
  [key: string]: any;
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