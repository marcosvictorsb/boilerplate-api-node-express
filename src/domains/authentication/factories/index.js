const AuthenticationController = require('../controller/authentication-controller');
const AuthenticationValidator = require('../validator/authentication-validator');
const AuthenticationService = require('../service/authentication-service');
const { schema } = require('../validator/authentication-schema');
const factory = require('../../customers/factories/index');
const enumHelperUser = require('../../../helpers/enumHelperUser');
const logger = require('../../../config/logger');

const getController = (params = {}) => new AuthenticationController({
  serviceAuth: params.serviceAuth || new AuthenticationService(),
  validator: params.validator || new AuthenticationValidator({ schema }),
  customerService: params.customerService || factory.getService(),
  enumHelper: params.enumHelper || enumHelperUser,
  logger: params.logger || logger,
});

module.exports = { getController };
