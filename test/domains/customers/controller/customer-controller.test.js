const { stub, assert: { calledOnce, calledWith, notCalled } } = require('sinon');
const { getController, getService } = require('../../../../src/domains/customers/factories');

describe('CUSTOMER CONTROLLER', () => {
  beforeEach(() => {
    this.params = {
      service: getService()
    }
    this.controller = getController(this.params);

    this.controller.errorHandler = stub().callsFake(() => this.response);

    this.customer = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      passwordRepeat: 'any_password'
    }

    this.controller.validator = {
      validateBodyParams: stub().resolves(this.customer),
    }

    this.controller.service = {
      create: stub().resolves({}),
      getByEmail: stub().resolves({}),
      getAllCustomers: stub().resolves({}),
      forgetPassword: stub().resolves({}),
    }

    this.controller.logger = {
      error: stub().returns()
    }

    this.request = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        passwordRepeat: 'any_password'
      },
      query: {
        email: 'any_email',
      }
    }

    this.response = {
      json: stub().returns(),
      status: stub().callsFake(() => this.response)
    }
  });

  describe('CREATE', () => {
    it('call logger.error and errorHandler when validator.validateBodyParams rejects', async () => {
      this.controller.validator.validateBodyParams = stub().rejects();

      await this.controller.create(this.request, this.response);

      notCalled(this.controller.service.create);
      notCalled(this.response.status);
      notCalled(this.response.json);
      calledOnce(this.controller.logger.error);
      calledOnce(this.controller.errorHandler);
    })

    it('call logger.error and errorHandler when service.create rejects', async () => {
      this.controller.service.create = stub().rejects();

      await this.controller.create(this.request, this.response);

      calledOnce(this.controller.service.create);
      calledWith(this.controller.service.create, this.customer);
      notCalled(this.response.status);
      notCalled(this.response.json);
      calledOnce(this.controller.logger.error);
      calledOnce(this.controller.errorHandler);
    })

    it('not call logger.error and errorHandler when validator.validateBodyParams and service.create returns correct values', async () => {
      await this.controller.create(this.request, this.response);

      calledOnce(this.controller.service.create);
      calledWith(this.controller.service.create, this.customer);
      calledOnce(this.response.status);
      calledOnce(this.response.json);
      notCalled(this.controller.logger.error);
      notCalled(this.controller.errorHandler);
    })
  });

  describe('GET BY EMAIL', () => {
    it('call logger.error and errorHandler when service.getByEmail rejects', async () => {
      this.controller.service.getByEmail = stub().rejects();

      await this.controller.getByEmail(this.request, this.response);

      calledOnce(this.controller.service.getByEmail);
      calledWith(this.controller.service.getByEmail, this.customer.email);
      notCalled(this.response.status);
      notCalled(this.response.json);
      calledOnce(this.controller.logger.error);
      calledOnce(this.controller.errorHandler);
    })

    it('not call logger.error and errorHandler when service.getByEmail return correct values', async () => {
      await this.controller.getByEmail(this.request, this.response);

      calledOnce(this.controller.service.getByEmail);
      calledWith(this.controller.service.getByEmail, this.customer.email);
      calledOnce(this.response.status);
      calledOnce(this.response.json);
      notCalled(this.controller.logger.error);
      notCalled(this.controller.errorHandler);
    })
  })

  describe('GET ALL CUSTOMERS', () => {
    it('call logger.error and errorHandler when service.getAllCustomers rejects', async () => {
      this.controller.service.getAllCustomers = stub().rejects();

      await this.controller.getAllCustomers(this.request, this.response);

      calledOnce(this.controller.service.getAllCustomers);
      notCalled(this.response.status);
      notCalled(this.response.json);
      calledOnce(this.controller.logger.error);
      calledOnce(this.controller.errorHandler);
    })

    it('not call logger.error and errorHandler when service.getAllCustomers return correct values', async () => {
      await this.controller.getAllCustomers(this.request, this.response);

      calledOnce(this.controller.service.getAllCustomers);
      calledOnce(this.response.status);
      calledOnce(this.response.json);
      notCalled(this.controller.logger.error);
      notCalled(this.controller.errorHandler);
    })
  })

  describe('FORGET PASSWORD', () => {
    it('call logger.error and errorHandler when service.forgetPassword rejects', async () => {
      this.controller.service.forgetPassword = stub().rejects();

      await this.controller.forgetPassword(this.request, this.response);

      calledOnce(this.controller.service.forgetPassword);
      notCalled(this.response.status);
      notCalled(this.response.json);
      calledOnce(this.controller.logger.error);
      calledOnce(this.controller.errorHandler);
    })

    it('not call logger.error and errorHandler when service.forgetPassword return correct values', async () => {
      await this.controller.forgetPassword(this.request, this.response);

      calledOnce(this.controller.service.forgetPassword);
      calledOnce(this.response.status);
      calledOnce(this.response.json);
      notCalled(this.controller.logger.error);
      notCalled(this.controller.errorHandler);
    })
  })
});
