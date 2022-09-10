const os = require('os');

class HealthService {
  constructor(params = {}) {
    this.logger = params.logger;
    this.httpResponseStatusCode = params.httpResponseStatusCode;
  }

  async health() {
    try {
      const currentDateTime = new Date().toLocaleString();
      const networkInterfaces = os.networkInterfaces();

      const response = {
        currentDateTime,
        message: 'server online',
        networkInterfaces,
      };
      return this.httpResponseStatusCode.OK(response);
    } catch (error) {
      this.logger.error('[HEALTH SERVICE] - error to generate current date time');
      return this.httpResponseStatusCode.serverError(error.message);
    }
  }
}

module.exports = HealthService;
