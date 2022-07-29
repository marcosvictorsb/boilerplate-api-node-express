const UserRepository = require('../repositories/customer-repository');
const AdapterEncryption = require('../adapter/adapterEncryption');
const AdapterToken = require('../../authentication/adapter/adapterToken');
const enumHelperUser = require('../../../helpers/enumHelperUser');
const logger = require('../../../config/logger');
const {
  created, conflict, serverError, OK,
} = require('../../../protocols/https');

class CustomerService {
  constructor(params = {}) {
    this.repository = params.repository || new UserRepository();
    this.enumHelperUser = params.enumHelperUser || enumHelperUser;
    this.logger = params.logger || logger;
    this.adapterEncryption = params.adapterEncryption || AdapterEncryption;
    this.adapterToken = params.adapterToken || AdapterToken;
  }

  async create(user) {
    try {
      const { name, email, password } = user;

      const userAlreadyExists = await this.repository.getByEmail(email);
      if (userAlreadyExists) {
        this.logger.info(`[CUSTOMER SERVICE] - ${this.enumHelperUser.user.alreadyExists} : ${email}`);
        return conflict(this.enumHelperUser.user.alreadyExists);
      }

      const newUser = {
        name,
        email,
        passwordEncryption: this.adapterEncryption.generateHashPassword(password),
      };
      const result = await this.repository.create(newUser);
      if (!result) {
        this.logger.info(`[CUSTOMER SERVICE] - ${this.enumHelperUser.user.errorToCreateUser}`);
        return conflict(this.enumHelperUser.user.errorToCreateUser);
      }

      const userCreated = this.removePassword(result);
      userCreated.token = this.adapterToken.sign(user.id);
      return created(userCreated);
    } catch (error) {
      this.logger.info('[CUSTOMER SERVICE] - error to create user');
      return serverError(error.message);
    }
  }

  /* eslint-disable */
  removePassword(user) {
    user.passwordEncryption = undefined;
    return user;
  }

  async getByEmail(email) {
    try {
      const user = await this.repository.getByEmail(email);
      if (!user) {
        this.logger.info('[CUSTOMER SERVICE] - error to get user by email');
        return conflict(this.enumHelperUser.user.notFoundUser);
      }
      return OK(user);
    } catch (error) {
      this.logger.info('[CUSTOMER SERVICE] - error to get user by email');
      return serverError(error.message);
    }
  }

  comparePasswords(password, userPassword) {
    try {
      const result = this.adapterEncryption.comparePasswords(password, userPassword);
      if (!result) {
        this.logger.info('[CUSTOMER SERVICE] - [COMPARE PASSWORD] - password mismatch');
        conflict(this.enumHelperUser.user.mismatchPassword);
      }

      return OK(result);
    } catch (error) {
      this.logger.error('[CUSTOMER SERVICE] - [COMPARE PASSWORD] - password mismatch');
      return serverError(error.message);
    }
  }

  async getAllCustomers() {
    try {
      const customers = await this.repository.getAllCustomers();
      if (!customers) {
        this.logger.info('[CUSTOMER SERVICE] - doesn\'t customers registered');
        conflict(this.enumHelperUser.user.doNotCustomersRegistered);
      }

      return OK(customers);
    } catch (error) {
      this.logger.error('[CUSTOMER SERVICE] - intern error to get all customers');
      return serverError(error.message);
    }
  }
}

module.exports = CustomerService;
