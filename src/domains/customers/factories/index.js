const CustomerService = require('../services/customer-service');
const CustomerController = require('../controller/customer-controllers');
const CustomerRepository = require('../repositories/customer-repository');
const UserValidator = require('../validator/user-validator');
const AdapterEncryption = require('../adapter/adapterEncryption');
const AdapterToken = require('../../authentication/adapter/adapterToken');
const logger = require('../../../config/logger');
const enumHelperUser = require('../../../helpers/enumHelperUser');

const getRepository = () => {
  const tableName = 'users';
  return new CustomerRepository({
    tableName,
    logger,
  });
};

const getService = (params = {}) => new CustomerService({
  repository: params.repository || getRepository(),
  enumHelperUser: params.enumHelperUser || enumHelperUser,
  logger: params.logger || logger,
  validator: params.validator || new UserValidator(),
  adapterEncryption: params.adapterEncryption || AdapterEncryption,
  adapterToken: params.adapterToken || AdapterToken,
});

const getController = (params = {}) => new CustomerController({
  service: params.service || getService(),
  logger: params.logger || logger,
  enumHelperUser: params.enumHelperUser || enumHelperUser,
  validator: params.validator || new UserValidator(),
});

module.exports = {
  getController,
  getService,
};
