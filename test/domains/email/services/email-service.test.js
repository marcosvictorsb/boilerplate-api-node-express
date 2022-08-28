const chai = require('chai')
const { expect } = chai
chai.use(require('chai-as-promised'))
const { stub, assert: { calledOnce, calledWith, notCalled } } = require('sinon');
const { getService } = require('../../../../src/domains/email/factories')

describe('EMAIL SERVICE', () => {
  beforeEach(() => {
    this.service = getService();
    this.service.transporter = {
      sendMail: stub().resolves(undefined)
    }

    this.service.httpResponseStatusCode = {
      OK: stub().returns(),
    }

    this.service.logger = {
      error: stub().returns(),
    }

    this.name = 'any_name';
    this.email = 'any_email';
  });

  describe('SEND EMAIL FORGET PASSWORD', () => {
    it('call httpResponseStatusCode.OK', async () => {
      await this.service.sendEmailForgetPassword(this.name, this.email)

      calledOnce(this.service.transporter.sendMail);
      calledOnce(this.service.httpResponseStatusCode.OK);
      notCalled(this.service.logger.error);
    })

    it('throw an error if transporter.sendMail return a throw', async () => {
      this.service.transporter.sendMail = stub().rejects(new Error('Send email'));

      await expect(this.service.sendEmailForgetPassword(this.name, this.email))
        .to.be.rejectedWith('Send email')
      calledOnce(this.service.logger.error);
    })
  });
});
