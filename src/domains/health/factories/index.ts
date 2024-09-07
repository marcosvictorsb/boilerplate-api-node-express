import HealthService from '../services/health-service';
import HealthController from '../controller/health-controller';
import logger from '../../../config/logger';
import { HttpResponseHandler } from '../../../protocols/HttpResponseHandler';


const getService = (): HealthService => new HealthService({
  logger,
  httpResponseHandler: new HttpResponseHandler(),
});


const getController = (params: { service?: HealthService } = {}): HealthController => new HealthController({
  service: params.service || getService(),
  logger,
});

export {
  getController,
  getService,
};
