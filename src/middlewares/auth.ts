import { NextFunction, Request, Response } from "express";
require('dotenv').config();
const jwt = require('jsonwebtoken');


interface CustomRequest extends Request {
  userId?: string;
}

export const authMiddleware = (request: CustomRequest, response: Response, next: NextFunction) => {
  try {
    const authHeader = request.header('authorization');
    if (!authHeader) return response.status(401).json({ error: 'No token provided' });

    const parts = authHeader.split(' ');
    if (parts.length !== 2) return response.status(401).json({ error: 'Not format valid token' });

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) return response.status(401).json({ error: 'Token unformatted' });

    jwt.verify(token, process.env.JWT_SECRET_SIGN, (error: any, decode: { id: any; }) => {
      if (error) return response.status(401).json({ error: 'Token invalid' });
      request.userId = decode.id;
      return next();
    });
  } catch (error) {
    return response.status(500).json({ error: 'Internal error to valid token' });
  }
};

