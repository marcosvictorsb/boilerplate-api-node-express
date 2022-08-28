class EmailService {
  constructor(params = {}) {
    this.transporter = params.transporter;
    this.httpResponseStatusCode = params.httpResponseStatusCode;
    this.logger = params.logger;
  }

  async sendEmailForgetPassword(name, email) {
    try {
      const info = await this.transporter.sendMail({
        from: 'TEMPLATE FORGET PASSWORD',
        to: email,
        subject: 'RESET PASSWORD',
        html: `
        Hi ${name},
        You recently requested to reset the password for your[customer portal]account.Click the button below to proceed.
        <button type="button">Click Me!</button>
        If you did not request a password reset, please ignore this email or reply to let us know.This password reset link is only valid for the next 30 minutes.
        Thanks, the [customer portal] team`,
      });
      return this.httpResponseStatusCode.OK(info);
    } catch (error) {
      this.logger.error('[CUSTOMER SERVICE] - error to send link to forget password');
      throw new Error(error);
    }
  }
}

module.exports = EmailService;
