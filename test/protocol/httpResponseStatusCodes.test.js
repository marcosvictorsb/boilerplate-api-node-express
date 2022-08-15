const { HttpResponseStatusCodes } = require("../../src/protocols/httpResponseStatusCodes");
const { expect } = require('chai');


describe('Http Response Status Codes', () => {
  beforeEach(() => {
    this.httpResponseStatusCodes = new HttpResponseStatusCodes();
  })

  it('OK', () => {
    const response = this.httpResponseStatusCodes.OK('OK')
    expect(response.status).to.equal(200);
    expect(response.body.result).to.equal('OK');
  })

  it('Conflict', () => {
    const response = this.httpResponseStatusCodes.conflict('Error to conflict')
    expect(response.status).to.equal(409);
    expect(response.body).to.deep.equal({ error: 'Error to conflict' });
  })

  it('NoContent', () => {
    const response = this.httpResponseStatusCodes.noContent('No Content')
    expect(response.status).to.equal(204);
    expect(response.body.result).to.equal('No Content');
  })

  it('Created', () => {
    const response = this.httpResponseStatusCodes.created('Created')
    expect(response.status).to.equal(201);
    expect(response.body.result).to.equal('Created');
  })

  it('NotFound', () => {
    const response = this.httpResponseStatusCodes.notFound('Not Found')
    expect(response.status).to.equal(404);
    expect(response.body.result).to.equal('Not Found');
  })

  it('ServerError', () => {
    const response = this.httpResponseStatusCodes.serverError('Server Error')
    expect(response.status).to.equal(500);
    expect(response.body).to.deep.equal({ error: 'Server Error' });
  })
})