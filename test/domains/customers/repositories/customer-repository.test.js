const CustomerRepository = require('../../../../src/domains/customers/repositories/customer-repository');
const CustomerModel = require('../../../../src/infra/database/models/customers');
const { expect } = require('chai');
const { stub, assert: { calledOnce, calledWith, notCalled } } = require('sinon');
const logger = require('../../../../src/config/logger');
const { HttpResponseStatusCodes } = require('../../../../src/protocols/httpResponseStatusCodes');

describe('CUSTOMER SERVICE', () => {
  beforeEach(() => {
    this.logger = logger;

    this.customerModel = CustomerModel;

    this.repository = new CustomerRepository({
      logger,
      model: this.customerModel,
      httpResponseStatusCode: new HttpResponseStatusCodes(),
    });

    this.repository.model = {
      create: stub().resolves({ dataValues: "any_data_values" }),
      findAll: stub().resolves([{ customer: "new_customer" }])
    }

    this.repository.logger = {
      error: stub().resolves()
    }

    this.repository.httpResponseStatusCode = {
      serverError: stub().resolves()
    }

    this.newCustomer = {
      dataValues: {
        id: 1,
        name: "any_name",
        email: "any_email",
        password: "any_password"
      }
    }

    this.customer = {
      name: "any_name",
      email: "any_email",
      password: "any_password"
    }
  });

  describe('CREATE', () => {
    it('call the model.create', async () => {
      await this.repository.create(this.customer);

      calledOnce(this.repository.model.create);
      calledWith(this.repository.model.create, this.customer);
      notCalled(this.repository.logger.error);
      notCalled(this.repository.httpResponseStatusCode.serverError);
    })

    it('return new user created', async () => {
      this.repository.model.create = stub().resolves(this.newCustomer);

      const newCustomer = await this.repository.create(this.customer);

      expect(newCustomer).to.be.eql(this.newCustomer.dataValues);
      calledOnce(this.repository.model.create);
      calledWith(this.repository.model.create, this.customer);
      notCalled(this.repository.logger.error);
      notCalled(this.repository.httpResponseStatusCode.serverError);
    })

    it('rejects model.create', async () => {
      this.repository.model.create = stub().rejects();

      await this.repository.create(this.customer);

      calledOnce(this.repository.model.create);
      calledWith(this.repository.model.create, this.customer);
      calledOnce(this.repository.logger.error);
      calledOnce(this.repository.httpResponseStatusCode.serverError);
    })

  });

  describe('GET BY EMAIL', () => {
    beforeEach(() => {
      this.expectQueryFindAll = {
        where: {
          email: this.customer.email
        },
        raw: true
      }
    })

    it('call the model.findAll', async () => {
      await this.repository.getByEmail(this.customer.email);

      calledOnce(this.repository.model.findAll);
      calledWith(this.repository.model.findAll, this.expectQueryFindAll);
      notCalled(this.repository.logger.error);
      notCalled(this.repository.httpResponseStatusCode.serverError);
    })

    it('return customer by email', async () => {
      this.repository.model.findAll = stub().resolves([this.newCustomer]);

      const customer = await this.repository.getByEmail(this.customer.email);

      expect(customer).to.be.eql(this.newCustomer);
      calledOnce(this.repository.model.findAll);
      calledWith(this.repository.model.findAll, this.expectQueryFindAll);
      notCalled(this.repository.logger.error);
      notCalled(this.repository.httpResponseStatusCode.serverError);
    })

    it('rejects model.findAll', async () => {
      this.repository.model.findAll = stub().rejects();

      await this.repository.getByEmail(this.customer.email);

      calledOnce(this.repository.model.findAll);
      calledWith(this.repository.model.findAll, this.expectQueryFindAll);
      calledOnce(this.repository.logger.error);
      calledOnce(this.repository.httpResponseStatusCode.serverError);
    })

  });

  describe('GET ALL CUSTOMER', () => {
    beforeEach(() => {
      this.expectQueryFindAll = {
        raw: true
      }

      this.customers = [
        {
          id: 1,
          name: "any_name",
          email: "any_email",
          password: "any_password"
        },

        {
          id: 2,
          name: "any_name",
          email: "any_email",
          password: "any_password"
        },

        {
          id: 3,
          name: "any_name",
          email: "any_email",
          password: "any_password"
        },
      ]
    })

    it('return the customers when call the model.findAll', async () => {
      this.repository.model.findAll = stub().resolves(this.customers);
      const customers = await this.repository.getAllCustomers();

      expect(customers).to.be.eql(this.customers);
      calledOnce(this.repository.model.findAll);
      calledWith(this.repository.model.findAll, this.expectQueryFindAll);
      notCalled(this.repository.logger.error);
      notCalled(this.repository.httpResponseStatusCode.serverError);
    })

    it('rejects model.findAll', async () => {
      this.repository.model.findAll = stub().rejects();

      await this.repository.getAllCustomers(this.customer.email);

      calledOnce(this.repository.model.findAll);
      calledWith(this.repository.model.findAll, this.expectQueryFindAll);
      calledOnce(this.repository.logger.error);
      calledOnce(this.repository.httpResponseStatusCode.serverError);
    })

  });
});
