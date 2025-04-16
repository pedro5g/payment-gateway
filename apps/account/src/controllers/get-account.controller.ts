import { GetAccountService } from "../services/get-account.service"
import { Controller } from "../../../../core/__domain/infra/controller"
import { HttpResponse, ok } from "../../../../core/__domain/infra/http-response"
import { HttpRequest } from "../../../../core/__domain/infra/http-request"
import {
  HttpMethod,
  HttpMiddleware,
  Inject,
  RestController,
} from "../core/domain/infra/decorators"
import { HasApiKeyMiddleware } from "../../../../core/middlewares/has-api-key"

@HttpMethod("GET")
@HttpMiddleware([HasApiKeyMiddleware])
@RestController()
export class GetAccountController implements Controller {
  constructor(
    @Inject(GetAccountService)
    private readonly getAccountService: GetAccountService,
  ) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    const apiKey = request.apiKey || ""
    const account = await this.getAccountService.execute({ apiKey })

    return ok({ message: "Account", account })
  }
}
