const HealthService = require('../services/health-service');
const HealthController = require('../controller/health-controllers');
const logger = require('../../../config/logger');
const { HttpResponseStatusCodes } = require('../../../protocols/httpResponseStatusCodes');

const getService = (params = {}) => new HealthService({
  logger: params.logger || logger,
  httpResponseStatusCode: params.httpResponseStatusCode || new HttpResponseStatusCodes(),
});

const getController = (params = {}) => new HealthController({
  service: params.service || getService(),
  logger: params.logger || logger,
});

module.exports = {
  getController,
  getService,
};
