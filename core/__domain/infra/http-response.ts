import { HTTP_STATUS } from "core/utils/http-status"

export type HttpResponse = {
  ok: boolean
  statusCode: number
} & ({ ok: true; body: any } | { ok: false; body: { error: any } })

export function ok<T>(dto?: T): HttpResponse {
  return {
    ok: true,
    statusCode: HTTP_STATUS.OK,
    body: dto,
  }
}

export function created(): HttpResponse {
  return {
    ok: true,
    statusCode: HTTP_STATUS.CREATED,
    body: undefined,
  }
}

export function clientError<T = unknown>(error: T): HttpResponse {
  return {
    ok: false,
    statusCode: HTTP_STATUS.BAD_REQUEST,
    body: {
      error,
    },
  }
}

export function unauthorized<T = unknown>(error: T): HttpResponse {
  return {
    ok: false,
    statusCode: HTTP_STATUS.UNAUTHORIZED,
    body: {
      error,
    },
  }
}

export function forbidden<T = unknown>(error: T): HttpResponse {
  return {
    ok: false,
    statusCode: HTTP_STATUS.FORBIDDEN,
    body: {
      error,
    },
  }
}

export function notFound<T = unknown>(error: T): HttpResponse {
  return {
    ok: false,
    statusCode: HTTP_STATUS.NOT_FOUND,
    body: {
      error,
    },
  }
}

export function conflict<T = unknown>(error: T): HttpResponse {
  return {
    ok: false,
    statusCode: HTTP_STATUS.CONFLICT,
    body: {
      error,
    },
  }
}

export function tooMany<T = unknown>(error: T): HttpResponse {
  return {
    ok: false,
    statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
    body: {
      error,
    },
  }
}

export function fail<T = unknown>(error: T): HttpResponse {
  return {
    ok: false,
    statusCode: 500,
    body: {
      error,
    },
  }
}
