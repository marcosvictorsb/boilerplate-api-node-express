const { conflict, OK, serverError } = require('../../../protocols/https');
const enumHelperUser = require('../../../helpers/enumHelperUser');
const UserService = require('../../customers/services/users-service');
const logger = require('../../../config/logger');
const AdapterToken = require('../adapter/adapterToken');

class AuthenticationService {
  constructor(params = {}) {
    this.enumHelperUser = params.enumHelperUser || enumHelperUser;
    this.userService = params.userService || new UserService();
    this.logger = params.logger || logger;
  }

  async authenticate(email, password) {
    try {
      const result = await this.userService.getByEmail(email);

      const { result: user } = result.body;
      if (!user) {
        this.logger.info(`User not found with email ${email}`);
        return conflict(this.enumHelperUser.user.notFoundUser);
      }

      const isCompare = await this.userService.comparePasswords(password, user.passwordEncryption);
      if (!isCompare) {
        this.logger.info('the password is incorrect');
        return conflict(this.enumHelperUser.user.emailOrPassword);
      }
      /* eslint-disable no-param-reassign */
      user.passwordEncryption = undefined;
      user.token = AdapterToken.sign(user.id);
      return OK(user);
    } catch (error) {
      this.logger.error('[AuthenticationService] - error to compare the password');
      return serverError(error.message);
    }
  }
}

module.exports = AuthenticationService;
