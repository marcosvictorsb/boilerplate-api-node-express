class AuthenticationService {
  constructor(params = {}) {
    this.enumHelperCustomer = params.enumHelperCustomer;
    this.customerService = params.customerService;
    this.logger = params.logger;
    this.adapterToken = params.adapterToken;
    this.httpResponseStatusCode = params.httpResponseStatusCode;
  }

  async authenticate(email, password) {
    try {
      const result = await this.customerService.getByEmail(email);

      const { result: customer } = result.body;
      if (!customer) {
        this.logger.info(`User not found with email ${email}`);
        return this.httpResponseStatusCode.conflict(this.enumHelperCustomer.notFoundUser);
      }

      const isCompare = await this.customerService
        .isComparePasswords(password, customer.password);
      if (!isCompare) {
        this.logger.info('[AuthenticationService] - the password is incorrect');
        return this.httpResponseStatusCode
          .conflict(this.enumHelperCustomer.emailOrPassword);
      }
      /* eslint-disable no-param-reassign */
      customer.password = undefined;
      customer.token = this.adapterToken.sign(customer.id);
      return this.httpResponseStatusCode.OK(customer);
    } catch (error) {
      this.logger.error('[AuthenticationService] - error to compare the password');
      return this.httpResponseStatusCode.OK(error.message);
    }
  }
}

module.exports = AuthenticationService;
