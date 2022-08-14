class CustomerService {
  constructor(params = {}) {
    this.repository = params.repository;
    this.enumHelperCustomer = params.enumHelperCustomer;
    this.logger = params.logger;
    this.adapterEncryption = params.adapterEncryption;
    this.adapterToken = params.adapterToken;
    this.httpResponseStatusCode = params.httpResponseStatusCode;
  }

  async create(params) {
    try {
      const { name, email, password } = params;
      const customerExists = await this.repository.getByEmail(email);
      if (customerExists) {
        this.logger.info(`[CUSTOMER SERVICE] - ${this.enumHelperCustomer.alreadyExists} : ${email}`);
        return this.httpResponseStatusCode.conflict(this.enumHelperCustomer.alreadyExists);
      }

      const newCustomer = {
        name,
        email,
        password: await this.adapterEncryption.generateHashPassword(password),
      };

      const customer = await this.repository.create(newCustomer);

      if (!customer) {
        this.logger.info(`[CUSTOMER SERVICE] - ${this.enumHelperCustomer.errorToCreateUser}`);
        return this.httpResponseStatusCode.conflict(this.enumHelperCustomer.errorToCreateUser);
      }

      const customerCreated = this.removePassword(customer);
      customerCreated.token = this.adapterToken.sign(customerCreated.id);
      return this.httpResponseStatusCode.created(customerCreated);
    } catch (error) {
      this.logger.error('[CUSTOMER SERVICE] - error to create user');
      return this.httpResponseStatusCode.serverError(error.message);
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
        return this.httpResponseStatusCode.conflict(this.enumHelperCustomer.customer.notFoundUser);
      }
      return this.httpResponseStatusCode.OK(customer);
    } catch (error) {
      this.logger.info('[CUSTOMER SERVICE] - error to get user by email');
      return this.httpResponseStatusCode.serverError(error.message);
    }
  }

  isComparePasswords(password, userPassword) {
    try {
      const isComparePassword = this.adapterEncryption.comparePasswords(password, userPassword);
      return isComparePassword ? true : false;
    } catch (error) {
      this.logger.error('[CUSTOMER SERVICE] - [COMPARE PASSWORD] - password mismatch');
      return this.httpResponseStatusCode.serverError(error.message);
    }
  }

  async getAllCustomers() {
    try {
      const customers = await this.repository.getAllCustomers();
      if (!customers) {
        this.logger.info('[CUSTOMER SERVICE] - doesn\'t customers registered');
        return this.httpResponseStatusCode.conflict(this.enumHelperCustomer.customer.doNotCustomersRegistered);
      }
      return this.httpResponseStatusCode.OK(customers);
    } catch (error) {
      this.logger.error('[CUSTOMER SERVICE] - intern error to get all customers');
      return this.httpResponseStatusCode.serverError(error.message);
    }
  }
}

module.exports = CustomerService;
