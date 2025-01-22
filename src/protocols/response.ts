export const HttpStatusCode = {
  OK: 200,
  Created: 201,
  NoContent: 204,
  NotFound: 404,
  Conflict: 409,
  ServerError: 500,
} as const;

type HttpResponse<T = any> = {
  status: number;
  body: T;
};

export class Response {
  static ok<T>(response: T): HttpResponse<T> {
    return {
      status: HttpStatusCode.OK,
      body: response,
    };
  }

  static conflict(message: string): HttpResponse<{ message: string }> {
    return {
      status: HttpStatusCode.Conflict,
      body: { message },
    };
  }

  static noContent(message: string): HttpResponse<{ result: string }> {
    return {
      status: HttpStatusCode.NoContent,
      body: { result: message },
    };
  }

  static created<T>(response: T): HttpResponse<{ response: T }> {
    return {
      status: HttpStatusCode.Created,
      body: { response },
    };
  }

  static notFound<T>(response: T): HttpResponse<{ result: T }> {
    return {
      status: HttpStatusCode.NotFound,
      body: { result: response },
    };
  }

  static serverError(error: any): HttpResponse<{ error: any }> {
    return {
      status: HttpStatusCode.ServerError,
      body: { error },
    };
  }
}
