import logger from '../../../config/logger';
import { HttpResponseHandler } from '../../../protocols/HttpResponseHandler';

interface HealthServiceParams {
  logger?: typeof logger;
  httpResponseHandler?: HttpResponseHandler;
}

class HealthService {
  private logger: typeof logger;
  private httpResponseHandler: HttpResponseHandler

  constructor(params: HealthServiceParams = {}) {
    this.logger = params.logger || logger;
    this.httpResponseHandler = params.httpResponseHandler  || new HttpResponseHandler();
  }

  public async health(): Promise<any> {
    return this.httpResponseHandler.OK(new Date());
  }
}

export default HealthService;

