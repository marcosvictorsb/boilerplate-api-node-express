const CustomerRepository = require('../repositories/customer-repository');
const AdapterEncryption = require('../adapter/adapterEncryption');
const AdapterToken = require('../../authentication/adapter/adapterToken');
const enumHelperCustomer = require('../../../helpers/enumHelperCustomer');
const logger = require('../../../config/logger');
const {
  created, conflict, serverError, OK,
} = require('../../../protocols/https');

class CustomerService {
  constructor(params = {}) {
    this.repository = params.repository || new CustomerRepository();
    this.enumHelperCustomer = params.enumHelperCustomer || enumHelperCustomer;
    this.logger = params.logger || logger;
    this.adapterEncryption = params.adapterEncryption || AdapterEncryption;
    this.adapterToken = params.adapterToken || AdapterToken;
  }

  async create(params) {
    try {
      const { name, email, password } = params;

      const customerExists = await this.repository.getByEmail(email);
      if (customerExists.length) {
        this.logger.info(`[CUSTOMER SERVICE] - ${this.enumHelperCustomer.customer.alreadyExists} : ${email}`);
        return conflict(this.enumHelperCustomer.customer.alreadyExists);
      }

      const newCustomer = {
        name,
        email,
        password: this.adapterEncryption.generateHashPassword(password),
      };
      const customer = await this.repository.create(newCustomer);
      if (!customer) {
        this.logger.info(`[CUSTOMER SERVICE] - ${this.enumHelperCustomer.customer.errorToCreateUser}`);
        return conflict(this.enumHelperCustomer.customer.errorToCreateUser);
      }

      const customerCreated = this.removePassword(customer);
      customerCreated.token = this.adapterToken.sign(customerCreated.id);
      return created(customerCreated);
    } catch (error) {
      this.logger.info('[CUSTOMER SERVICE] - error to create user');
      return serverError(error.message);
    }
  }

  /* eslint-disable */
  removePassword(customer) {
    customer.password = undefined;
    return customer;
  }

  async getByEmail(email) {
    try {
      let customer = await this.repository.getByEmail(email);
      if (!customer) {
        this.logger.info('[CUSTOMER SERVICE] - error to get user by email');
        return conflict(this.enumHelperCustomer.customer.notFoundUser);
      }
      customer = this.removePassword(customer);
      return OK(customer);
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
        conflict(this.enumHelperCustomer.customer.mismatchPassword);
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
        conflict(this.enumHelperCustomer.customer.doNotCustomersRegistered);
      }

      return OK(customers);
    } catch (error) {
      this.logger.error('[CUSTOMER SERVICE] - intern error to get all customers');
      return serverError(error.message);
    }
  }
}

module.exports = CustomerService;
