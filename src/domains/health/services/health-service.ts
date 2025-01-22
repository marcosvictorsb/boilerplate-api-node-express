import logger from '../../../config/logger';
import { Response } from '../../../protocols/response';

interface HealthServiceParams {
  response: typeof Response;
}

export interface IHealthService {
  health(): Promise<any>;
}

class HealthService implements IHealthService {
  private response: typeof Response

  constructor(params: HealthServiceParams) {
    this.response = params.response;
  }

  public async health(): Promise<any> {
    return this.response.ok({
      serverDate: new Date()
    });
  }
}

export default HealthService;

