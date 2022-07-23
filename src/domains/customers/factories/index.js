const UserService = require('../services/users-service');
const UserController = require('../controller/users-controllers');
const UserRepository = require('../repositories/users-repository');
const logger = require('../../../config/logger');
const enumHelperUser = require('../../../helpers/enumHelperUser');
const UserValidator = require('../validate/user-validator');

const getRepository = () => {
  const tableName = 'users';
  return new UserRepository({
    tableName,
    logger,
  });
};

const getService = () => {
  const repository = getRepository();
  return new UserService({ repository, enumHelperUser, logger });
};

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
