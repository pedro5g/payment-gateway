import { FastifyRequest, FastifyReply } from "fastify"
import { createAccountSchema } from "../../../../core/validators/account.validator"
import { CreateAccountService } from "../services/create-account.service"

import { HTTP_STATUS } from "../../../../core/utils/http-status"

export class CreateAccountController {
  constructor(private readonly createAccountService: CreateAccountService) {}

  async handler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { name, email } = createAccountSchema.parse(request.body)

    const account = await this.createAccountService.execute({ name, email })

    return reply
      .status(HTTP_STATUS.CREATED)
      .send({ message: "Account created successfully", account })
  }
}
