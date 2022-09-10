const { schema } = require('./customer-schema');

class CustomerValidator {
  constructor(params = {}) {
    this.schema = params.schema || schema;
  }

  async validateBodyParams(params) {
    const validate = await this.schema.validateAsync(params);
    return validate;
  }
}

module.exports = CustomerValidator;
