const UserService = require('../services/users-service')
const logger = require('../../../config/logger');
const { serverError } = require('../../../protocols/https');

class UserController { 
  constructor(params = {}) {
    this.service = params.service || new UserService()
    this.logger = params.logger || logger;
  }

  create(request, response) {
    try {     
      const result = this.service.create(request.body);
      return response.status(result.status).json(result.body);
    } catch (error) {
      this.logger.error(this.enumHelperUser.user.errorToCreateUser);
      serverError(error.message)
    }
  }
}


module.exports = UserController;