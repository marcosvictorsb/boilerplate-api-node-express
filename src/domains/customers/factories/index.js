const UserService = require('../services/users-service')
const UserController = require('../controllers/users-controllers')
const UserRepository = require('../repositories/users-repository')
const logger = require('../../../config/logger');
const enumHelperUser = require('../../../helpers/enumHelperUser')

const getRepository = () => {
  const tableName = 'users'
  return new UserRepository({ 
    tableName,
    logger 
  })
}

const getService = () => {
  const repository = getRepository();
  return new UserService({ repository, enumHelperUser, logger })
}

const getController = () => {
  const service = getService();
  return new UserController({ service, logger, enumHelperUser });
}

module.exports = {
  getController
}