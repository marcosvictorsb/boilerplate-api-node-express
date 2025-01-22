interface Params {
  authSchema: any;
}

class AuthenticationValidator {
  authSchema: any;
  constructor(params: Params) {
    this.authSchema = params.authSchema;
  }

  async validateBodyParams(params: any) {
    const validate = await this.authSchema.validateAsync(params);
    return validate;
  }
}

module.exports = AuthenticationValidator;
