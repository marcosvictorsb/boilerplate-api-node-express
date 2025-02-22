import { Router } from 'express';
import { getController } from '../factories';

const controller = getController();

const router = Router();
router.get('/', (request, response) => controller.health(request, response));

export default router;