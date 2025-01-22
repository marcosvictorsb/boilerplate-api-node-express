const { schema } = require('./customer-schema');

interface Params {
  schema: any;
}

class CustomerValidator {
  schema: any;
  constructor(params: Params) {
    this.schema = params.schema;
  }

  async validateBodyParams(params: any) {
    const validate = await this.schema.validateAsync(params);
    return validate;
  }
}

module.exports = CustomerValidator;
