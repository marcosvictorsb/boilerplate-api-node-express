const HttpStatusCode = {
  OK: 200,
  Created: 201,
  noContent: 204,
  notFound: 404,
  Conflict: 409,
  serverError: 500,
};

const OK = (response) => ({
  status: HttpStatusCode.OK,
  body: { result: response },
});

const conflict = (error) => ({
  status: HttpStatusCode.Conflict,
  body: { error },
});

const noContent = (message) => ({
  status: HttpStatusCode.noContent,
  body: { result: message },
});

const created = (response) => ({
  status: HttpStatusCode.Created,
  body: { result: response },
});

const notFound = (response) => ({
  status: HttpStatusCode.notFound,
  body: { result: response },
});

const serverError = (error) => ({
  status: HttpStatusCode.serverError,
  body: { error },
});

module.exports = {
  HttpStatusCode,
  created,
  conflict,
  serverError,
  notFound,
  OK,
  noContent,
};
