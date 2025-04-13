import { FastifyReply, FastifyRequest } from "fastify"
import { GetAccountService } from "../services/get-account.service"
import { HTTP_STATUS } from "../../../../core/utils/http-status"

export class GetAccountController {
  constructor(private readonly getAccountService: GetAccountService) {}

  async handler(request: FastifyRequest, reply: FastifyReply) {
    const apiKey = request.apiKey

    const account = await this.getAccountService.execute({ apiKey })

    return reply.status(HTTP_STATUS.OK).send({ account })
  }
}
