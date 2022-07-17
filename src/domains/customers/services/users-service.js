const UserRepository = require('../repositories/users-repository');
const AdpaterEncryption = require('../adapters/adpterEncryption');
const enumHelperUser = require('../../../helpers/enumHelperUser');
const logger = require('../../../config/logger');
const {
  created, conflict, serverError, OK,
} = require('../../../protocols/https');

class UserService {
  constructor(params = {}) {
    this.repository = params.repository || new UserRepository();
    this.enumHelperUser = params.enumHelperUser || enumHelperUser;
    this.logger = params.logger || logger;
  }

  async create(user) {
    try {
      const { name, email, password } = user;

      const userAlreadyExists = await this.repository.getByEmail(email);
      if (userAlreadyExists) {
        this.logger.info(`[CREATE USER SERVICE] - ${this.enumHelperUser.user.alreadyExists} : ${email}`);
        return conflict(this.enumHelperUser.user.alreadyExists);
      }

      const newUser = {
        name,
        email,
        passwordEncryption: AdpaterEncryption.generateHashPassword(password),
      };
      const result = await this.repository.create(newUser);
      if (!result) {
        this.logger.info(`[CREATE USER SERVICE] - ${this.enumHelperUser.user.errorToCreateUser}`);
        return conflict(this.enumHelperUser.user.errorToCreateUser);
      }

      return created(result);
    } catch (error) {
      this.logger.info('[CREATE USER SERVICE] - error to create user');
      return serverError(error.message);
    }
  }

  async getByEmail(email) {
    try {
      const user = await this.repository.getByEmail(email);
      if (!user) {
        this.logger.info('[CREATE USER SERVICE] - error to get user by email');
        return conflict(this.enumHelperUser.user.notFoundUser);
      }
      return OK(user);
    } catch (error) {
      this.logger.info('[CREATE USER SERVICE] - error to get user by email');
      return serverError(error.message);
    }
  }
}

module.exports = UserService;
