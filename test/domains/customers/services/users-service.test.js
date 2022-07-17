const { expect } = require('chai');
const { stub, assert } = require('sinon');

const logger = require('../../../../src/config/logger');
const UserRepository = require('../../../../src/domains/customers/repositories/users-repository');
const UserService = require('../../../../src/domains/customers/services/users-service');
const enumHelperUser = require('../../../../src/helpers/enumHelperUser');
const { HttpStatusCode } = require('../../../../src/protocols/https');

describe('USERS SERVICE', () => {
  beforeEach(() => {
    this.repository = new UserRepository();
    this.enumHelperUser = enumHelperUser;
    this.logger = logger;
    this.service = new UserService({
      repository: this.repository,
      enumHelperUser,
      logger: this.logger,
    });

    this.user = {
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
    it('return status code 409 when exist user with same email', async () => {
      this.service.repository.getByEmail = stub().resolves([{ name: 'any_name' }]);

      const result = await this.service.create(this.user);

      assert.calledOnce(this.service.repository.getByEmail);
      assert.calledWith(this.service.repository.getByEmail, this.user.email);
      assert.calledOnce(this.service.logger.info);
      expect(result.status).to.eq(HttpStatusCode.Conflict);
    });

    it('return status code 409 when repository create result rejected', async () => {
      const result = await this.service.create(this.user);

      assert.calledOnce(this.service.repository.getByEmail);
      assert.calledWith(this.service.repository.getByEmail, this.user.email);
      assert.calledOnce(this.service.repository.create);
      expect(result.status).to.eq(HttpStatusCode.Conflict);
    });

    it('return status code 201 when create new user', async () => {
      this.service.repository.create = stub().resolves([]);

      const result = await this.service.create(this.user);

      assert.calledOnce(this.service.repository.getByEmail);
      assert.calledWith(this.service.repository.getByEmail, this.user.email);
      assert.calledOnce(this.service.repository.create);
      expect(result.status).to.eq(HttpStatusCode.Created);
    });

    it('return status code 500 when happen in the moment to get user by email', async () => {
      this.service.repository.getByEmail = stub().rejects();

      const result = await this.service.create(this.user);

      assert.calledOnce(this.service.repository.getByEmail);
      assert.calledWith(this.service.repository.getByEmail, this.user.email);
      expect(result.status).to.eq(HttpStatusCode.serverError);
    });

    it('return status code 500 when happen in the moment to create user', async () => {
      this.service.repository.create = stub().rejects();

      const result = await this.service.create(this.user);

      assert.calledOnce(this.service.repository.getByEmail);
      assert.calledWith(this.service.repository.getByEmail, this.user.email);
      expect(result.status).to.eq(HttpStatusCode.serverError);
    });
  });
});
