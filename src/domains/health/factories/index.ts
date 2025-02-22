import HealthService from '../services/health-service';
import { HealthController } from '../controller/health.controller';
import logger from '../../../config/logger';
import { Presenter } from '../../../protocols//presenter';


const getService = (): HealthService => new HealthService({presenter: new Presenter()});


const getController = (): HealthController => new HealthController({
  service: getService(),
  gateway: {
    logger: logger,
  },
});

export {
  getController,
  getService,
};
