import { Controller } from "../../../../core/__domain/infra/controller"
import {
  HttpMethod,
  HttpMiddleware,
  Inject,
  RestController,
} from "../core/domain/infra/decorators"
import {
  created,
  HttpResponse,
} from "../../../../core/__domain/infra/http-response"
import { HttpRequest } from "../../../../core/__domain/infra/http-request"
import { addBalanceSchema } from "../../../../core/validators/gateway.validator"
import { HasApiKeyMiddleware } from "../../../../core/middlewares/has-api-key"
import { AddBalanceService } from "../services/add-balance.service"

@HttpMethod("POST", "/add-balance")
@HttpMiddleware([HasApiKeyMiddleware])
@RestController()
export class AddBalanceController implements Controller {
  constructor(
    @Inject(AddBalanceService)
    private readonly addBalanceService: AddBalanceService,
  ) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    const { amount } = addBalanceSchema.parse(request.body)
    const apiKey = request.apiKey

    await this.addBalanceService.execute({
      key: apiKey,
      amount,
    })

    return created({ message: "Add balance successfully" })
  }
}
