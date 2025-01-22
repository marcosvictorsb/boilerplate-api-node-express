import { Express, Request, Response, NextFunction } from 'express';
import { getControllerUser } from '../factories/index'
// const { authMiddleware } = require('../../../middlewares/auth');

const controller = getControllerUser();

export function loadRoutes(server: Express): void {
  server.post('/user', (request: Request, response: Response, next: NextFunction) => { 
    controller.create(request, response); 
  });
};
