const Controller = require('../../../interfaces/base-controller');

class HealthController extends Controller {
  constructor(params = {}) {
    super();
    this.service = params.service;
    this.logger = params.logger;
  }

  async health(request, response) {
    try {
      const result = await this.service.health();
      return response.status(result.status).json(result.body);
    } catch (error) {
      this.logger.error('[HEALTH CONTROLLER] - error to call method service.health');
      return this.errorHandler(error, request, response);
    }
  }
}

module.exports = HealthController;
