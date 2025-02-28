import { Express, Request, Response, NextFunction, Router } from 'express';
import { userController } from '../factories/user.factory';


const router = Router();


router.post("/", (request, response) => userController.create(request, response));
// router.get("/", (request, response) => userController.getUsers(request, response));

export default router;