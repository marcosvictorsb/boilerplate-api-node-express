const AuthenticationController = require('../controller/authentication-controller');
const AuthenticationValidator = require('../validator/authentication-validator');
const AuthenticationService = require('../service/authentication-service');
const { schema } = require('../validator/authentication-schema');
const factory = require('../../customers/factories/index');
const enumHelperCustomer = require('../../../helpers/enumHelperCustomer');
const logger = require('../../../config/logger');
const AdapterToken = require('../adapter/adapterToken');

const getController = (params = {}) => new AuthenticationController({
  serviceAuth: params.serviceAuth || new AuthenticationService(),
  validator: params.validator || new AuthenticationValidator({ schema }),
  customerService: params.customerService || factory.getService(),
  enumHelperCustomer: params.enumHelperCustomer || enumHelperCustomer,
  logger: params.logger || logger,
  adapterToken: params.adapterToken || AdapterToken,
});

module.exports = { getController };
