const FIRST_POSITION = 0;
class CustomerRepository {
  constructor(params = {}) {
    this.logger = params.logger;
    this.model = params.model;
    this.httpResponseStatusCode = params.httpResponseStatusCode;
  }

  async create(customer) {
    try {
      const customerCreated = await this.model.create(customer);
      return customerCreated.dataValues;
    } catch (error) {
      this.logger.error('[CUSTOMER REPOSITORY] - error to create customer');
      return this.httpResponseStatusCode.serverError(error.message);
    }
  }

  async getByEmail(email) {
    try {
      const customer = await this.model.findAll({ where: { email }, raw: true });
      return customer[FIRST_POSITION];
    } catch (error) {
      this.logger.error('[CUSTOMER REPOSITORY] - error to get customer by email');
      return this.httpResponseStatusCode.serverError(error.message);
    }
  }

  async getAllCustomers() {
    try {
      const customers = await this.model.findAll({ raw: true });
      return customers;
    } catch (error) {
      this.logger.error('[CUSTOMER REPOSITORY] - error to get all customers');
      return this.httpResponseStatusCode.serverError(error.message);
    }
  }
}

module.exports = CustomerRepository;
