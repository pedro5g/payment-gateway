import { HttpResponse, ok } from "core/__domain/infra/http-response"
import { Controller } from "../../../../core/__domain/infra/controller"
import {
  HttpMethod,
  Inject,
  RestController,
} from "../core/domain/infra/decorators"
import { EnterInAccountService } from "../services/enter-in-account.service"
import { HttpRequest } from "../../../../core/__domain/infra/http-request"
import { enterInAccountSchema } from "../../../../core/validators/account.validator"

@HttpMethod("POST", "/login")
@RestController()
export class EnterInAccountController implements Controller {
  constructor(
    @Inject(EnterInAccountService)
    private readonly enterInAccountService: EnterInAccountService,
  ) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    const { email } = enterInAccountSchema.parse(request.body)
    const { account } = await this.enterInAccountService.execute({ email })

    return ok({ message: "Enter in account successfully", account })
  }
}
