const logger = require('../../../config/logger');
const { serverError } = require('../../../protocols/https');
const Customers = require('../../../infra/database/models/customers');

class CustomerRepository {
  constructor(params = {}) {
    this.logger = params.logger || logger;
  }

  async create(customer) {
    try {
      const customerCreated = await Customers.create(customer);
      return customerCreated.dataValues;
    } catch (error) {
      this.logger.error('[CUSTOMER REPOSITORY] - error to create customer');
      return serverError(error.message);
    }
  }

  async getByEmail(email) {
    try {
      const customer = await Customers.findAll({ where: { email } });
      return customer[0].dataValues;
    } catch (error) {
      this.logger.error('[CUSTOMER REPOSITORY] - error to get customer by email');
      return serverError(error.message);
    }
  }

  async getAllCustomers() {
    try {
      const customers = await Customers.findAll();
      return customers;
    } catch (error) {
      this.logger.error('[CUSTOMER REPOSITORY] - error to get all customers');
      return serverError(error.message);
    }
  }
}

module.exports = CustomerRepository;
