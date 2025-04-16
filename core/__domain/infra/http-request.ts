export type HttpRequest<T extends object = {}> = {
  body?: unknown
  params?: unknown
  query?: unknown
  apiKey?: string
} & T
