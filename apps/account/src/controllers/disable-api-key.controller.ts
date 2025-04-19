import { Controller } from "../../../../core/__domain/infra/controller"
import {
  HttpMethod,
  HttpMiddleware,
  Inject,
  RestController,
} from "../core/domain/infra/decorators"
import { HttpResponse, ok } from "../../../../core/__domain/infra/http-response"
import { HttpRequest } from "../../../../core/__domain/infra/http-request"
import { DisableApiKeyService } from "../services/disable-api-key.service"
import { disableApiKeySchema } from "../../../../core/validators/api-key.validator"
import { IsAuthenticated } from "../../../../core/middlewares/is-authenticated"

@HttpMethod("PATCH", "/api-key/:apiKeyId/disable")
@HttpMiddleware([IsAuthenticated])
@RestController()
export class DisableApiKeyController implements Controller {
  constructor(
    @Inject(DisableApiKeyService)
    private readonly disableApiKeyService: DisableApiKeyService,
  ) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    const { apiKeyId } = disableApiKeySchema.parse(request.params)
    const accountId = request.userId

    await this.disableApiKeyService.execute({
      accountId,
      id: apiKeyId,
    })

    return ok()
  }
}
