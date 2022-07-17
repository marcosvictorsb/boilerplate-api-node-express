const logger = require('../../../config/logger');
const { serverError } = require('../../../protocols/https');

const users = [];

class UserRepository {
  constructor(params = {}) {
    this.tableName = params.tableName || 'users';
    this.logger = params.logger || logger;
  }

  async create(user) {
    try {
      users.push(user);
      this.logger.info('[CREATE USER REPOSITORY] - return user');

      return users;
    } catch (error) {
      this.logger.error('[CREATE USER REPOSITORY] - error to create user');
      return serverError(error.message);
    }
  }

  async getByEmail(email) {
    try {
      const result = users.filter((user) => user.email === email);
      this.logger.info('[CREATE USER REPOSITORY] - return user');

      return result[0];
    } catch (error) {
      this.logger.error('[CREATE USER REPOSITORY] - error to get user by email');
      return serverError(error.message);
    }
  }
}

module.exports = UserRepository;
