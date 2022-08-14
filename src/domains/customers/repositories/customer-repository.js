const { serverError } = require('../../../protocols/httpResponseStatusCodes');

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
      const customer = await this.model.findAll({ where: { email }, raw: true });
      return customer[0];
    } catch (error) {
      this.logger.error('[CUSTOMER REPOSITORY] - error to get customer by email');
      return serverError(error.message);
    }
  }

  async getAllCustomers() {
    try {
      const customers = await this.model.findAll({ raw: true });
      return customers;
    } catch (error) {
      this.logger.error('[CUSTOMER REPOSITORY] - error to get all customers');
      return serverError(error.message);
    }
  }
}

module.exports = CustomerRepository;
