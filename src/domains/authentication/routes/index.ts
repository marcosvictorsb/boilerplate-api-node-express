import { Express, Request, Response, NextFunction, Router } from 'express';
import { getControllerAuthentication } from '../factories/index';

const controller = getControllerAuthentication();

const router = Router();

router.post("/", (request, response) => controller.authenticate(request, response));
router.post("/register", (request, response) => controller.register(request, response));

export default router;