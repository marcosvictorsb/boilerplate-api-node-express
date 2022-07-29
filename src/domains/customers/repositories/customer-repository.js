const logger = require('../../../config/logger');
const { serverError } = require('../../../protocols/https');

const customers = [];

class CustomerRepository {
  constructor(params = {}) {
    this.tableName = params.tableName || 'customers';
    this.logger = params.logger || logger;
  }

  async create(customer) {
    try {
      customers.push(customer);
      this.logger.info('[CUSTOMER REPOSITORY] - return customer');

      return customers[customers.length - 1];
    } catch (error) {
      this.logger.error('[CUSTOMER REPOSITORY] - error to create customer');
      return serverError(error.message);
    }
  }

  async getByEmail(email) {
    try {
      const result = customers.filter((customer) => customer.email === email);
      this.logger.info('[CUSTOMER REPOSITORY] - return customer');

      return result[0];
    } catch (error) {
      this.logger.error('[CUSTOMER REPOSITORY] - error to get customer by email');
      return serverError(error.message);
    }
  }

  async getAllCustomers() {
    try {
      return customers;
    } catch (error) {
      this.logger.error('[CUSTOMER REPOSITORY] - error to get all customers');
      return serverError(error.message);
    }
  }
}

module.exports = CustomerRepository;
