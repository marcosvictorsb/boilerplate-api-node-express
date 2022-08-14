const AuthenticationController = require('../controller/authentication-controller');
const AuthenticationValidator = require('../validator/authentication-validator');
const AuthenticationService = require('../service/authentication-service');
const { schema } = require('../validator/authentication-schema');
const factoryCustomer = require('../../customers/factories/index');
const enumHelperCustomer = require('../../../helpers/enumHelperCustomer');
const enumHelperAuthentication = require('../../../helpers/enumHelperAuthentication');
const logger = require('../../../config/logger');
const AdapterToken = require('../adapter/adapterToken');

const getService = (params = {}) => new AuthenticationService({
  enumHelperCustomer: params.enumHelperCustomer || enumHelperCustomer,
  customerService: params.customerService || factoryCustomer.getService(),
  logger: params.logger || logger,
  adapterToken: params.adapterToken || new AdapterToken(),
});

const getController = (params = {}) => new AuthenticationController({
  serviceAuth: params.serviceAuth || getService(),
  validator: params.validator || new AuthenticationValidator({ schema }),
  customerService: params.customerService || factoryCustomer.getService(),
  enumHelperCustomer: params.enumHelperCustomer || enumHelperCustomer,
  enumHelperAuthentication: params.enumHelperAuthentication || enumHelperAuthentication,
  logger: params.logger || logger,
  adapterToken: params.adapterToken || AdapterToken,
});

module.exports = { getController };
