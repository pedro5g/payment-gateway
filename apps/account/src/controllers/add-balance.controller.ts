import { Controller } from "../../../../core/__domain/infra/controller"
import {
  HttpMethod,
  HttpMiddleware,
  Inject,
  RestController,
} from "../core/domain/infra/decorators"
import { HttpResponse, ok } from "../../../../core/__domain/infra/http-response"
import { HttpRequest } from "../../../../core/__domain/infra/http-request"
import { addBalanceSchema } from "../../../../core/validators/account.validator"
import { AddBalanceService } from "../services/add-balance.service"
import { IsAuthenticated } from "../../../../core/middlewares/is-authenticated"

@HttpMethod("POST", "/add-balance")
@HttpMiddleware([IsAuthenticated])
@RestController()
export class AddBalanceController implements Controller {
  constructor(
    @Inject(AddBalanceService)
    private readonly addBalanceService: AddBalanceService,
  ) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    const accountId = request.userId
    const { balance } = addBalanceSchema.parse(request.body)

    await this.addBalanceService.execute({
      accountId,
      balance,
    })

    return ok({ message: "Add balance successfully" })
  }
}
