import { Express, Request, Response, NextFunction } from 'express';
import { getController } from '../factories';

const controller = getController();

export function loadRoutes(server: Express): void {
  server.get('/health', (request: Request, response: Response, next: NextFunction) => {
    controller.health(request, response)
  });
};
