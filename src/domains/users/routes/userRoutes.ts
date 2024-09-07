import { Express, Request, Response, NextFunction } from 'express';
import { getControllerUser } from '../factories/index'
// const { authMiddleware } = require('../../../middlewares/auth');

const controller = getControllerUser();

export function loadRoutes(server: Express): void {
  server.post('/user/', (request: Request, response: Response, next: NextFunction) => { 
    controller.create(request, response); 
  });

  server.get('/user/', (...args) => {
    console.log('controller.getAllUsers(...args)');
  });
  server.get('/user/email', (...args) => {
    console.log('controller.getByEmail(...args)');
  });
  server.get('/user/forget-password', (...args) => {
    console.log('controller.forgetPassword(...args)');
  });
};
