const { serverError } = require('../../../protocols/https');

class CustomerRepository {
  constructor(params = {}) {
    this.logger = params.logger;
    this.model = params.model;
  }

  async create(customer) {
    try {
      const customerCreated = await this.model.create(customer);
      return customerCreated.dataValues;
    } catch (error) {
      this.logger.error('[CUSTOMER REPOSITORY] - error to create customer');
      return serverError(error.message);
    }
  }

  async getByEmail(email) {
    try {
      const customer = await this.model.findAll({ where: { email } });
      return customer[0] ? customer[0].dataValues : undefined;
    } catch (error) {
      this.logger.error('[CUSTOMER REPOSITORY] - error to get customer by email');
      return serverError(error.message);
    }
  }

  async getAllCustomers() {
    try {
      const customers = await this.model.findAll();
      return customers;
    } catch (error) {
      this.logger.error('[CUSTOMER REPOSITORY] - error to get all customers');
      return serverError(error.message);
    }
  }
}

module.exports = CustomerRepository;
