import { Controller } from "../../../../core/__domain/infra/controller"
import {
  HttpMethod,
  HttpMiddleware,
  Inject,
  RestController,
} from "../core/domain/infra/decorators"
import { HttpResponse, ok } from "../../../../core/__domain/infra/http-response"
import { HttpRequest } from "../../../../core/__domain/infra/http-request"
import { IsAuthenticated } from "../../../../core/middlewares/is-authenticated"
import { UpdateAutoApproveLimitService } from "../services/update-auto-approve-limit.service"
import { updateAutoApproveLimitSchema } from "../../../../core/validators/account.validator"

@HttpMethod("PATCH", "/limit/update")
@HttpMiddleware([IsAuthenticated])
@RestController()
export class UpdateAutoApproveLimitController implements Controller {
  constructor(
    @Inject(UpdateAutoApproveLimitService)
    private readonly updateAutoApproveLimitService: UpdateAutoApproveLimitService,
  ) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    const { limit } = updateAutoApproveLimitSchema.parse(request.body)
    const accountId = request.userId

    await this.updateAutoApproveLimitService.execute({
      accountId,
      limit,
    })

    return ok()
  }
}
