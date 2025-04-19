import { Controller } from "../../../../core/__domain/infra/controller"
import {
  HttpMethod,
  HttpMiddleware,
  Inject,
  RestController,
} from "../core/domain/infra/decorators"
import { HttpResponse, ok } from "../../../../core/__domain/infra/http-response"
import { HttpRequest } from "../../../../core/__domain/infra/http-request"
import { CreateApiKeyService } from "../services/create-api-key.service"
import { IsAuthenticated } from "../../../../core/middlewares/is-authenticated"

@HttpMethod("POST", "/api-key/new")
@HttpMiddleware([IsAuthenticated])
@RestController()
export class CreateApiKeyController implements Controller {
  constructor(
    @Inject(CreateApiKeyService)
    private readonly createApiKeyService: CreateApiKeyService,
  ) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    const accountId = request.userId

    const { apiKey } = await this.createApiKeyService.execute({ accountId })

    return ok({ message: "New apiKey create successfully", apiKey })
  }
}
