class AuthenticationValidator {
  constructor(params = {}) {
    this.schema = params.schema;
  }

  async validateBodyParams(params) {
    const validate = await this.schema.validateAsync(params);
    return validate;
  }
}

module.exports = AuthenticationValidator;
