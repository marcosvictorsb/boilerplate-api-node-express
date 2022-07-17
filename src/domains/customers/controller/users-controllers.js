const UserService = require('../services/users-service');
const enumHelperUser = require('../../../helpers/enumHelperUser');
const logger = require('../../../config/logger');
const { serverError } = require('../../../protocols/https');

class UserController {
  constructor(params = {}) {
    this.service = params.service || new UserService();
    this.logger = params.logger || logger;
    this.enumHelperUser = params.enumHelperUser || enumHelperUser;
  }

  async create(request, response) {
    try {
      const result = await this.service.create(request.body);
      return response.status(result.status).json(result.body);
    } catch (error) {
      this.logger.error(`[CREATE USER SERVICE] - ${this.enumHelperUser.user.errorToCreateUser}`);
      return serverError(error.message);
    }
  }

  async getByEmail(request, response) {
    try {
      const { email } = request.body;
      const result = await this.service.getByEmail(email);
      return response.status(result.status).json(result.body);
    } catch (error) {
      this.logger.error(`[CREATE USER SERVICE] - ${this.enumHelperUser.user.errorToCreateUser}`);
      return serverError(error.message);
    }
  }
}

module.exports = UserController;
