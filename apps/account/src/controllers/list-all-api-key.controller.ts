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
import { ListAllApiKeysService } from "../services/list-all-api-keys.service"

@HttpMethod("GET", "/api-key/list")
@HttpMiddleware([IsAuthenticated])
@RestController()
export class ListAllApiKeyController implements Controller {
  constructor(
    @Inject(ListAllApiKeysService)
    private readonly listAllApiKeysService: ListAllApiKeysService,
  ) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    const accountId = request.userId

    const { apiKeys } = await this.listAllApiKeysService.execute({ accountId })

    return ok({ message: "Api keys", apiKeys })
  }
}
