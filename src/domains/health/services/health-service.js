class HealthService {
  constructor(params = {}) {
    this.logger = params.logger;
    this.httpResponseStatusCode = params.httpResponseStatusCode;
  }

  async health() {
    try {
      const currentDateTime = new Date().toLocaleString();
      const response = {
        currentDateTime,
        message: 'server online',
      };
      return this.httpResponseStatusCode.OK(response);
    } catch (error) {
      this.logger.error('[HEALTH SERVICE] - error to generate current date time');
      return this.httpResponseStatusCode.serverError(error.message);
    }
  }
}

module.exports = HealthService;
