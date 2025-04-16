import { createAccountSchema } from "../../../../core/validators/account.validator"
import { CreateAccountService } from "../services/create-account.service"
import { Controller } from "../../../../core/__domain/infra/controller"
import { HttpResponse, ok } from "../../../../core/__domain/infra/http-response"
import { HttpRequest } from "../../../../core/__domain/infra/http-request"
import {
  HttpMethod,
  Inject,
  RestController,
} from "../core/domain/infra/decorators"

@HttpMethod("POST", "/register")
@RestController()
export class CreateAccountController implements Controller {
  constructor(
    @Inject(CreateAccountService)
    private readonly createAccountService: CreateAccountService,
  ) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    const { name, email } = createAccountSchema.parse(request.body)
    const account = await this.createAccountService.execute({ name, email })
    return ok({ message: "Account created successfully", account })
  }
}
