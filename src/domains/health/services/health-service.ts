import { Presenter } from '../../../protocols/presenter';

type HealthServiceParams = {
  presenter: Presenter;
}

export interface IHealthService {
  health(): Promise<any>;
}

class HealthService implements IHealthService {
  private presenter: Presenter

  constructor(params: HealthServiceParams) {
    this.presenter = params.presenter;
  }

  public async health(): Promise<any> {
    return this.presenter.OK({
      serverDate: new Date(),
    });
  }
}

export default HealthService;

