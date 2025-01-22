import HealthService from '../services/health-service';
import HealthController from '../controller/health-controller';
import logger from '../../../config/logger';
import { Response } from '../../../protocols/response';


const getService = (): HealthService => new HealthService({
  response: Response,
});


const getController = (): HealthController => new HealthController({
  service: getService(),
  logger,
});

export {
  getController,
  getService,
};
