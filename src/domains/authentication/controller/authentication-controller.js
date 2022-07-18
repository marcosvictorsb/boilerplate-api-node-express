const AuthenticationService = require('../service/authentication-service');

class AuthenticationController {
  constructor(params = {}) {
    this.serviceAuth = params.serviceAuth || new AuthenticationService();
  }

  async authenticate(request, response) {
    const { email, password } = request.body;
    const result = await this.serviceAuth.authenticate(email, password);
    return response.status(result.status).json(result.body);
  }
}

module.exports = AuthenticationController;
