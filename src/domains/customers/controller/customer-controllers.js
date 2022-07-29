const Controller = require('../../../interfaces/base-controller');
const { serverError } = require('../../../protocols/https');

class CustomerController extends Controller {
  constructor(params = {}) {
    super();
    this.service = params.service;
    this.logger = params.logger;
    this.enumHelperUser = params.enumHelperUser;
    this.validator = params.validator;
  }

  async create(request, response) {
    try {
      const customer = await this.validator.validateBodyParams(request.body);
      const result = await this.service.create(customer);
      return response.status(result.status).json(result.body);
    } catch (error) {
      this.logger.error(`[CUSTOMER CONTROLLER] - ${this.enumHelperUser.user.errorToCreatedUser}`);
      return this.errorHandler(error, request, response);
    }
  }

  async getByEmail(request, response) {
    try {
      const { email } = request.body;
      const result = await this.service.getByEmail(email);
      return response.status(result.status).json(result.body);
    } catch (error) {
      this.logger.error(`[CUSTOMER CONTROLLER] - ${this.enumHelperUser.user.errorToCreateUser}`);
      return serverError(error.message);
    }
  }

  async getAllCustomers(request, response) {
    try {
      const result = await this.service.getAllCustomers();
      return response.status(result.status).json(result.body);
    } catch (error) {
      this.logger.error(`[CUSTOMER CONTROLLER] - ${this.enumHelperUser.user.errorToCreateUser}`);
      return serverError(error.message);
    }
  }
}

module.exports = CustomerController;
