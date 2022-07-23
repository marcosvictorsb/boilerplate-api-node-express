const UserService = require('../services/users-service');
const UserController = require('../controller/users-controllers');
const UserRepository = require('../repositories/users-repository');
const logger = require('../../../config/logger');
const enumHelperUser = require('../../../helpers/enumHelperUser');
const UserValidator = require('../validator/user-validator');

const getRepository = () => {
  const tableName = 'users';
  return new UserRepository({
    tableName,
    logger,
  });
};

const getService = (params = {}) => new UserService({
  repository: params.repository || getRepository(),
  enumHelperUser: params.enumHelperUser || enumHelperUser,
  logger: params.logger || logger,
  validator: params.validator || new UserValidator(),
});

const getController = (params = {}) => new UserController({
  service: params.service || getService(),
  logger: params.logger || logger,
  enumHelperUser: params.enumHelperUser || enumHelperUser,
  validator: params.validator || new UserValidator(),
});

module.exports = {
  getController,
  getService,
};
