const { HttpResponseStatusCodes } = require('../../../protocols/httpResponseStatusCodes');
const transporter = require('../../../config/email');
const EmailService = require('../services/email-service');
const logger = require('../../../config/logger');

const getService = (params = {}) => new EmailService({
  transporter,
  httpResponseStatusCode: params.httpResponseStatusCode || new HttpResponseStatusCodes(),
  logger: params.logger || logger,
});

module.exports = {
  getService,
};
