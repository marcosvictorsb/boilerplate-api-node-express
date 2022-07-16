const UserService = require('../services/users-service')
const UserController = require('../controllers/users-controllers')
const UserRepository = require('../repositories/users-repository')

const getRepository = () => {
  const tableName = 'users'
  return new UserRepository({ tableName })
}

const getService = () => {
  const repository = getRepository();
  return new UserService({ repository })
}

const getController = () => {
  const service = getService();
  return new UserController({ service });
}

module.exports = {
  getController
}