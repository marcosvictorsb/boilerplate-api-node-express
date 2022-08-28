const Controller = require('../../../interfaces/base-controller');

class CustomerController extends Controller {
  constructor(params = {}) {
    super();
    this.service = params.service;
    this.logger = params.logger;
    this.enumHelperCustomer = params.enumHelperCustomer;
    this.validator = params.validator;
  }

  async create(request, response) {
    try {
      const customer = await this.validator.validateBodyParams(request.body);
      const result = await this.service.create(customer);
      return response.status(result.status).json(result.body);
    } catch (error) {
      this.logger.error(`[CUSTOMER CONTROLLER] - ${this.enumHelperCustomer.errorToCreatedUser}`);
      return this.errorHandler(error, request, response);
    }
  }

  async getByEmail(request, response) {
    try {
      const { email } = request.query;
      const result = await this.service.getByEmail(email);
      return response.status(result.status).json(result.body);
    } catch (error) {
      this.logger.error(`[CUSTOMER CONTROLLER] - ${this.enumHelperCustomer.errorToCreateUser}`);
      return this.errorHandler(error, request, response);
    }
  }

  async getAllCustomers(request, response) {
    try {
      const result = await this.service.getAllCustomers();
      return response.status(result.status).json(result.body);
    } catch (error) {
      this.logger.error(`[CUSTOMER CONTROLLER] - ${this.enumHelperCustomer.errorToCreateUser}`);
      return this.errorHandler(error, request, response);
    }
  }

  async forgetPassword(request, response) {
    try {
      const { email } = request.query;
      const result = await this.service.forgetPassword(email);
      return response.status(result.status).json(result.body);
    } catch (error) {
      this.logger.error(`[CUSTOMER CONTROLLER] - ${this.enumHelperCustomer.errorToCreateUser}`);
      return this.errorHandler(error, request, response);
    }
  }
}

module.exports = CustomerController;
