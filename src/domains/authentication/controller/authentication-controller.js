const Controller = require('../../../interfaces/base-controller');

class AuthenticationController extends Controller {
  constructor(params = {}) {
    super();
    this.serviceAuth = params.serviceAuth;
    this.validator = params.validator;
  }

  async authenticate(request, response) {
    try {
      const authenticated = await this.validator.validateBodyParams(request.body);
      const result = await this.serviceAuth.authenticate(authenticated);
      return response.status(result.status).json(result.body);
    } catch (error) {
      return this.errorHandler(error, request, response);
    }
  }
}

module.exports = AuthenticationController;
