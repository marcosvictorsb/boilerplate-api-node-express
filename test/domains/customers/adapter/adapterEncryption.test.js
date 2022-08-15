const AdapterEncryption = require('../../../../src/domains/customers/adapter/adapterEncryption');
const { expect } = require('chai');
const bcrypt = require('bcryptjs');
const { stub, assert: { calledOnce, calledWith, notCalled } } = require('sinon');
const { getService } = require('../../../../src/domains/customers/factories')


describe('ADAPTER ENCRYPTION', () => {
  beforeEach(() => {
    this.AdapterEncryption = new AdapterEncryption({
      bcrypt: bcrypt
    });
    this.AdapterEncryption.bcrypt = {
      genSaltSync: stub().returns('any_salt'),
      hashSync: stub().returns('any_hash'),
      compareSync: stub().returns(true),
    }
  })

  it('generate hash password', () => {
    const hash = this.AdapterEncryption.generateHashPassword('any_password')

    calledOnce(this.AdapterEncryption.bcrypt.genSaltSync)
    calledWith(this.AdapterEncryption.bcrypt.genSaltSync, 10)
    calledOnce(this.AdapterEncryption.bcrypt.hashSync)
    calledWith(this.AdapterEncryption.bcrypt.hashSync, 'any_password', 'any_salt')
    expect(hash).to.equal('any_hash')
  })

  it('compare password', () => {
    const comparePassword = this.AdapterEncryption.comparePasswords('any_password', 'any_password');

    calledOnce(this.AdapterEncryption.bcrypt.compareSync);
    calledWith(this.AdapterEncryption.bcrypt.compareSync, 'any_password', 'any_password');
    expect(comparePassword).to.be.true;
  })
})