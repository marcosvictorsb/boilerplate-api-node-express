const CustomerRepository = require('../../../../src/domains/customers/repositories/customer-repository');
const { expect } = require('chai');
const { stub, assert: { calledOnce, calledWith, notCalled } } = require('sinon');
const { getService } = require('../../../../src/domains/customers/factories')

describe('CUSTOMER SERVICE', () => {
  beforeEach(() => {
    this.repository = new CustomerRepository();
    this.service = getService();

    this.service.adapterEncryption = {
      generateHashPassword: stub().returns('encryption_password'),
    }

    this.service.adapterToken = {
      sign: stub().returns('any_token')
    }

    this.service.repository = {
      getByEmail: stub().resolves(undefined),
      create: stub().resolves(undefined),
    };

    this.service.logger = {
      info: stub().returns(),
      error: stub().returns(),
    };

    this.service.httpResponseStatusCode = {
      conflict: stub().returns(),
      serverError: stub().returns(),
      created: stub().returns(),
      OK: stub().returns(),
    }

    this.customer = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    };

    this.customerWithPasswordEncrypt = {
      name: 'any_name',
      email: 'any_email',
      password: 'encryption_password',
    };

    this.customerRemovePassword = {
      name: 'any_name',
      email: 'any_email',
      password: undefined,
    }

    this.newCustomerCreated = {
      id: 1,
      name: 'any_name',
      email: 'any_email',
      password: undefined,
      token: 'any_token'
    };
  });

  describe('CREATE', () => {
    beforeEach(() => {
      this.service.removePassword = stub().returns();
    })

    it('call conflict (status code 409) when exist customer with same email', async () => {
      this.service.repository.getByEmail = stub().resolves([{ name: 'any_name' }]);

      await this.service.create(this.customer);

      calledOnce(this.service.repository.getByEmail);
      calledWith(this.service.repository.getByEmail, this.customer.email);
      calledOnce(this.service.logger.info);
      calledOnce(this.service.httpResponseStatusCode.conflict);
      calledWith(this.service.httpResponseStatusCode.conflict,
        this.service.enumHelperCustomer.alreadyExists);
      notCalled(this.service.adapterEncryption.generateHashPassword);
      notCalled(this.service.repository.create);
      notCalled(this.service.removePassword)
      notCalled(this.service.adapterToken.sign)
      notCalled(this.service.httpResponseStatusCode.created)
      notCalled(this.service.httpResponseStatusCode.serverError)
    });

    it('call conflict (status code 409) when repository.create not return customer created', async () => {
      await this.service.create(this.customer);

      calledOnce(this.service.repository.getByEmail);
      calledWith(this.service.repository.getByEmail, this.customer.email);
      calledOnce(this.service.adapterEncryption.generateHashPassword);
      calledWith(this.service.adapterEncryption.generateHashPassword,
        this.customer.password);
      calledOnce(this.service.repository.create);
      calledWith(this.service.repository.create, this.customerWithPasswordEncrypt);
      calledOnce(this.service.httpResponseStatusCode.conflict);
      calledWith(this.service.httpResponseStatusCode.conflict,
        this.service.enumHelperCustomer.errorToCreateUser);
      notCalled(this.service.removePassword)
      notCalled(this.service.adapterToken.sign)
      notCalled(this.service.httpResponseStatusCode.created)
      notCalled(this.service.httpResponseStatusCode.serverError)

    });

    it('created new customer and called http response created (status code 201)', async () => {
      this.service.repository.create = stub().resolves(this.customer)
      this.service.removePassword = stub().returns(this.newCustomerCreated);

      await this.service.create(this.customer);

      calledOnce(this.service.repository.getByEmail);
      calledWith(this.service.repository.getByEmail, this.customer.email);
      calledOnce(this.service.adapterEncryption.generateHashPassword);
      calledWith(this.service.adapterEncryption.generateHashPassword,
        this.customer.password);
      calledOnce(this.service.repository.create);
      calledWith(this.service.repository.create, this.customerWithPasswordEncrypt);
      notCalled(this.service.httpResponseStatusCode.conflict);
      calledOnce(this.service.removePassword)
      calledWith(this.service.removePassword, this.customer)
      calledOnce(this.service.adapterToken.sign)
      calledWith(this.service.adapterToken.sign, this.newCustomerCreated.id)
      calledOnce(this.service.httpResponseStatusCode.created)
      calledWith(this.service.httpResponseStatusCode.created, this.newCustomerCreated)
      notCalled(this.service.httpResponseStatusCode.serverError)
    });

    it('call serverError (status code 500) when repository.getByEmail rejects', async () => {
      this.service.repository.getByEmail = stub().rejects();

      await this.service.create(this.customer);

      calledOnce(this.service.repository.getByEmail);
      calledWith(this.service.repository.getByEmail, this.customer.email);
      notCalled(this.service.logger.info);
      notCalled(this.service.httpResponseStatusCode.conflict);
      notCalled(this.service.adapterEncryption.generateHashPassword);
      notCalled(this.service.repository.create);
      notCalled(this.service.removePassword);
      notCalled(this.service.adapterToken.sign);
      notCalled(this.service.httpResponseStatusCode.created);
      calledOnce(this.service.logger.error);
      calledOnce(this.service.httpResponseStatusCode.serverError);
    });

    it('call serverError (status code 500) when adapterEncryption.generateHashPassword rejects', async () => {
      this.service.adapterEncryption.generateHashPassword = stub().rejects();

      await this.service.create(this.customer);

      calledOnce(this.service.repository.getByEmail);
      calledWith(this.service.repository.getByEmail, this.customer.email);
      notCalled(this.service.logger.info);
      notCalled(this.service.httpResponseStatusCode.conflict);
      calledOnce(this.service.adapterEncryption.generateHashPassword);
      notCalled(this.service.repository.create);
      notCalled(this.service.removePassword);
      notCalled(this.service.adapterToken.sign);
      notCalled(this.service.httpResponseStatusCode.created);
      calledOnce(this.service.logger.error);
      calledOnce(this.service.httpResponseStatusCode.serverError);
    });

    it('call serverError (status code 500) when repository.create rejects', async () => {
      this.service.repository.create = stub().rejects();

      await this.service.create(this.customer);

      calledOnce(this.service.repository.getByEmail);
      calledWith(this.service.repository.getByEmail, this.customer.email);
      notCalled(this.service.logger.info);
      notCalled(this.service.httpResponseStatusCode.conflict);
      calledOnce(this.service.adapterEncryption.generateHashPassword);
      calledOnce(this.service.repository.create);
      calledWith(this.service.repository.create, this.customerWithPasswordEncrypt);
      notCalled(this.service.removePassword);
      notCalled(this.service.adapterToken.sign);
      notCalled(this.service.httpResponseStatusCode.created);
      calledOnce(this.service.logger.error);
      calledOnce(this.service.httpResponseStatusCode.serverError);
    });

    it('call serverError (status code 500) when adapterToken.sign rejects', async () => {
      this.service.adapterToken.sign = stub().rejects();
      this.service.repository.create = stub().resolves(this.customer);

      await this.service.create(this.customer);

      calledOnce(this.service.repository.getByEmail);
      calledWith(this.service.repository.getByEmail, this.customer.email);
      notCalled(this.service.logger.info);
      notCalled(this.service.httpResponseStatusCode.conflict);
      calledOnce(this.service.adapterEncryption.generateHashPassword);
      calledOnce(this.service.repository.create);
      calledWith(this.service.repository.create, this.customerWithPasswordEncrypt);
      calledOnce(this.service.removePassword);
      calledWith(this.service.removePassword, this.customer);
      notCalled(this.service.adapterToken.sign);
      notCalled(this.service.httpResponseStatusCode.created);
      calledOnce(this.service.logger.error);
      calledOnce(this.service.httpResponseStatusCode.serverError);
    });
  });

  describe('REMOVE PASSWORD', () => {
    it('return customer.password equal to undefined', async () => {
      const newCustomer = this.service.removePassword(this.customer);
      expect(newCustomer.password).to.eq(undefined);
    })
  })

  describe('GET BY EMAIL', () => {
    it('return conflict (status code 409) when not return customer', async () => {
      await this.service.getByEmail(this.customer.email);

      calledOnce(this.service.repository.getByEmail);
      calledWith(this.service.repository.getByEmail, this.customer.email);
      calledOnce(this.service.logger.info);
      calledOnce(this.service.httpResponseStatusCode.conflict);
      calledWith(this.service.httpResponseStatusCode.conflict,
        this.service.enumHelperCustomer.notFoundUser);
      notCalled(this.service.httpResponseStatusCode.OK);
      notCalled(this.service.logger.error);
      notCalled(this.service.httpResponseStatusCode.serverError);
    })

    it('call OK (status code 200) when return customer', async () => {
      this.service.repository.getByEmail = stub().resolves(this.customer);

      await this.service.getByEmail(this.customer.email);

      calledOnce(this.service.repository.getByEmail);
      calledWith(this.service.repository.getByEmail, this.customer.email);

      notCalled(this.service.logger.info);
      notCalled(this.service.httpResponseStatusCode.conflict);
      calledOnce(this.service.httpResponseStatusCode.OK);
      calledWith(this.service.httpResponseStatusCode.OK, this.customer);
      notCalled(this.service.logger.error);
      notCalled(this.service.httpResponseStatusCode.serverError);
    })

    it('call serverError (status code 500) when repository.getByEmail rejects', async () => {
      this.service.repository.getByEmail = stub().rejects();

      await this.service.getByEmail(this.customer.email);

      calledOnce(this.service.repository.getByEmail);
      calledWith(this.service.repository.getByEmail, this.customer.email);

      notCalled(this.service.logger.info);
      notCalled(this.service.httpResponseStatusCode.conflict);
      notCalled(this.service.httpResponseStatusCode.OK);
      calledOnce(this.service.logger.error);
      calledOnce(this.service.httpResponseStatusCode.serverError);

    })
  })

  describe('IS COMPARE PASSWORD', () => {
    beforeEach(() => {
      this.passwordOne = 'any_password_one';
      this.passwordTwo = 'any_password_two';
    })
    it('return false when passwordOne is different than passwordTwo', async () => {
      this.service.adapterEncryption.comparePasswords = stub().returns(false);

      const isComparePassword = this.service.isComparePasswords(this.passwordOne, this.passwordTwo)

      expect(isComparePassword).to.be.false;
      notCalled(this.service.logger.error);
      notCalled(this.service.httpResponseStatusCode.serverError);
    })

    it('return false when passwordOne is equal to passwordTwo', async () => {
      this.service.adapterEncryption.comparePasswords = stub().returns(true);

      const isComparePassword = this.service.isComparePasswords(this.passwordOne, this.passwordTwo)

      expect(isComparePassword).to.be.true;
      notCalled(this.service.logger.error);
      notCalled(this.service.httpResponseStatusCode.serverError);
    })
  })
});
