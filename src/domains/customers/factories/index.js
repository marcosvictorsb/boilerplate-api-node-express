const UserController = require('../controllers/users-controllers')


const getController = () => {
  return new UserController();
}

module.exports = {
  getController
}