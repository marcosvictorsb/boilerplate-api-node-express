const HttpStatusCode = {
  OK: 200,
  Created: 201,
  noContent: 204,
  notFound: 404,
  Conflict: 409,
  serverError: 500,
};

class HttpResponseStatusCodes {
  constructor() {
    this.statusCodeOK = 200;
    this.statusCodeCreated = 201;
    this.statusCodeNoContent = 204;
    this.statusCodeNotFound = 404;
    this.statusCodeConflict = 409;
    this.statusCodeServerError = 500;
  }

  OK(response) {
    return {
      status: this.statusCodeOK,
      body: { result: response },
    };
  }

  conflict(error) {
    return {
      status: this.statusCodeConflict,
      body: { error },
    };
  }

  noContent(message) {
    return {
      status: this.statusCodeNoContent,
      body: { result: message },
    };
  }

  created(response) {
    return {
      status: this.statusCodeCreated,
      body: { result: response },
    };
  }

  notFound(response) {
    return {
      status: this.statusCodeNotFound,
      body: { result: response },
    };
  }

  static serverError(error) {
    return {
      status: this.statusCodeServerError,
      body: { error },
    };
  }
}

module.exports = {
  HttpStatusCode,
  HttpResponseStatusCodes,
};
