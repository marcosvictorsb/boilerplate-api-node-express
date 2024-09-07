import { Express, Request, Response, NextFunction } from 'express';
import { getControllerAuthentication } from '../factories/index';

const controller = getControllerAuthentication();

export function loadRoutes(server: Express): void {
  server.post('/authenticate', (request: Request, response: Response, next: NextFunction) => {
    controller.authenticate(request, response);
  });

  server.post('/register', (request: Request, response: Response, next: NextFunction) => {
    controller.register(request, response);
  });
}