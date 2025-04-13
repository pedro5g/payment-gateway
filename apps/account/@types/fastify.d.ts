import "fastify"

declare module "fastify" {
  export interface FastifyRequest {
    apiKey: string
  }
}
