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
import { UpdateWebhookUrlService } from "../services/update-webhook-url.service"
import { updateWebhookSchema } from "../../../../core/validators/account.validator"

@HttpMethod("PATCH", "/webhook/update")
@HttpMiddleware([IsAuthenticated])
@RestController()
export class UpdateWebhookUrlController implements Controller {
  constructor(
    @Inject(UpdateWebhookUrlService)
    private readonly updateWebhookUrlService: UpdateWebhookUrlService,
  ) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    const { webhookUrl } = updateWebhookSchema.parse(request.body)
    const accountId = request.userId

    await this.updateWebhookUrlService.execute({
      accountId,
      webhookUrl,
    })

    return ok()
  }
}
