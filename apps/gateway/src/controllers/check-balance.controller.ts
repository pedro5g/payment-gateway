import { Controller } from "../../../../core/__domain/infra/controller"
import {
  HttpMethod,
  HttpMiddleware,
  Inject,
  RestController,
} from "../core/domain/infra/decorators"
import { HttpResponse, ok } from "../../../../core/__domain/infra/http-response"
import { HttpRequest } from "../../../../core/__domain/infra/http-request"
import { HasApiKeyMiddleware } from "../../../../core/middlewares/has-api-key"
import { CheckBalanceService } from "../services/check-balance.service"

@HttpMethod("GET", "/balance")
@HttpMiddleware([HasApiKeyMiddleware])
@RestController()
export class CheckBalanceController implements Controller {
  constructor(
    @Inject(CheckBalanceService)
    private readonly checkBalanceService: CheckBalanceService,
  ) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    const apiKey = request.apiKey

    const { balance } = await this.checkBalanceService.execute({
      key: apiKey,
    })

    return ok({ message: "Current balance", balance })
  }
}
