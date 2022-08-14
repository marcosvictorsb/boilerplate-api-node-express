const CustomerService = require('../services/customer-service');
const CustomerController = require('../controller/customer-controllers');
const CustomerRepository = require('../repositories/customer-repository');
const CustomerValidator = require('../validator/customer-validator');
const AdapterEncryption = require('../adapter/adapterEncryption');
const AdapterToken = require('../../authentication/adapter/adapterToken');
const CustomerModel = require('../../../infra/database/models/customers');
const logger = require('../../../config/logger');
const { customer: enumHelperCustomer } = require('../../../helpers/enumHelperCustomer');
const { HttpResponseStatusCodes } = require('../../../protocols/httpResponseStatusCodes');

const getRepository = () => new CustomerRepository({ logger, model: CustomerModel });

const getService = (params = {}) => new CustomerService({
  repository: params.repository || getRepository(),
  enumHelperCustomer: params.enumHelperCustomer || enumHelperCustomer,
  logger: params.logger || logger,
  validator: params.validator || new CustomerValidator(),
  adapterEncryption: params.adapterEncryption || AdapterEncryption,
  adapterToken: params.adapterToken || new AdapterToken(),
  httpResponseStatusCode: params.httpResponseStatusCode || new HttpResponseStatusCodes(),
});

const getController = (params = {}) => new CustomerController({
  service: params.service || getService(),
  logger: params.logger || logger,
  enumHelperCustomer: params.enumHelperCustomer || enumHelperCustomer,
  validator: params.validator || new CustomerValidator(),
});

module.exports = {
  getController,
  getService,
};
