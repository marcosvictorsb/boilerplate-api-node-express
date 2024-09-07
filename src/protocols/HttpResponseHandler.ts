export const HttpStatusCode = {
  OK: 200,
  Created: 201,
  NoContent: 204,
  NotFound: 404,
  Conflict: 409,
  ServerError: 500,
} as const;

type HttpResponse = {
  status: number;
  body: any;
};

export class HttpResponseHandler {
  OK(response: any): HttpResponse {
    return {
      status: HttpStatusCode.OK,
      body: response,
    };
  }

  conflict(message: string): HttpResponse {
    return {
      status: HttpStatusCode.Conflict,
      body: { message },
    };
  }

  noContent(message: string): HttpResponse {
    return {
      status: HttpStatusCode.NoContent,
      body: { result: message },
    };
  }

  created(response: any): HttpResponse {
    return {
      status: HttpStatusCode.Created,
      body: { response },
    };
  }

  notFound(response: any): HttpResponse {
    return {
      status: HttpStatusCode.NotFound,
      body: { result: response },
    };
  }

  serverError(error: any): HttpResponse {
    return {
      status: HttpStatusCode.ServerError,
      body: { error },
    };
  }
}
