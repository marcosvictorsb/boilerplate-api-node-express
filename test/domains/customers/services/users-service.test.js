const { expect } = require('chai');
const { stub, assert } = require('sinon');

const logger = require('../../../../src/config/logger');
const CustomerRepository = require('../../../../src/domains/customers/repositories/customer-repository');
const CustomerService = require('../../../../src/domains/customers/services/customer-service');
const enumHelperCustomer = require('../../../../src/helpers/enumHelperCustomer');
const { HttpStatusCode } = require('../../../../src/protocols/https');
const AdapterEncryption = require('../../../../src/domains/customers/adapter/adapterEncryption')

describe('CUSTOMER SERVICE', () => {
  beforeEach(() => {
    this.repository = new CustomerRepository();
    this.enumHelperCustomer = enumHelperCustomer;
    this.logger = logger;
    this.service = new CustomerService({
      repository: this.repository,
      enumHelperCustomer,
      logger: this.logger,
      adapterEncryption: AdapterEncryption,
    });

    this.service.adapterEncryption = {
      generateHashPassword: stub().resolves('encryption_password'),
    }

    this.customer = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    };

    this.service.repository = {
      getByEmail: stub().resolves([]),
      create: stub().resolves(undefined),
    };

    this.service.logger = {
      info: stub().resolves(),
    };
  });

  describe('CREATE', () => {
    it('return status code 409 when exist customer with same email', async () => {
      this.service.repository.getByEmail = stub().resolves([{ name: 'any_name' }]);

      const result = await this.service.create(this.customer);

      assert.calledOnce(this.service.repository.getByEmail);
      assert.calledWith(this.service.repository.getByEmail, this.customer.email);
      assert.calledOnce(this.service.logger.info);
      expect(result.status).to.eq(HttpStatusCode.Conflict);
    });

    it('return status code 409 when repository create result rejected', async () => {
      const result = await this.service.create(this.customer);

      assert.calledOnce(this.service.repository.getByEmail);
      assert.calledWith(this.service.repository.getByEmail, this.customer.email);
      assert.calledOnce(this.service.adapterEncryption.generateHashPassword)
      assert.calledWith(this.service.adapterEncryption.generateHashPassword,
        this.customer.password)
      assert.calledOnce(this.service.repository.create);
      expect(result.status).to.eq(HttpStatusCode.Conflict);
    });

    it('return status code 201 when create new customer', async () => {
      this.customer.password = 'encryption_password'

      await this.service.create(this.customer);

      assert.calledOnce(this.service.repository.getByEmail);
      assert.calledWith(this.service.repository.getByEmail, this.customer.email);
      assert.calledOnce(this.service.adapterEncryption.generateHashPassword);
      assert.calledWith(this.service.adapterEncryption.generateHashPassword,
        this.customer.password);
      assert.calledOnce(this.service.repository.create);
      assert.calledWith(this.service.repository.create, this.customer);
    });

    it('return status code 500 when happen in the moment to get customer by email', async () => {
      this.service.repository.getByEmail = stub().rejects();

      const result = await this.service.create(this.customer);

      assert.calledOnce(this.service.repository.getByEmail);
      assert.calledWith(this.service.repository.getByEmail, this.customer.email);
      expect(result.status).to.eq(HttpStatusCode.serverError);
    });

    it('return status code 500 when happen in the moment to create customer', async () => {
      this.service.repository.create = stub().rejects();

      const result = await this.service.create(this.customer);

      assert.calledOnce(this.service.repository.getByEmail);
      assert.calledWith(this.service.repository.getByEmail, this.customer.email);
      expect(result.status).to.eq(HttpStatusCode.serverError);
    });
  });
});
