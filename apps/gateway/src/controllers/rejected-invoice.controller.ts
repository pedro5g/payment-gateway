import { Controller } from "../../../../core/__domain/infra/controller"
import {
  HttpMethod,
  HttpMiddleware,
  Inject,
  RestController,
} from "../core/domain/infra/decorators"
import { HttpResponse, ok } from "../../../../core/__domain/infra/http-response"
import { HttpRequest } from "../../../../core/__domain/infra/http-request"
import { rejectedInvoiceSchema } from "../../../../core/validators/gateway.validator"
import { HasApiKeyMiddleware } from "../../../../core/middlewares/has-api-key"
import { RejectedInvoiceService } from "../services/rejected-invoice.service"

@HttpMethod("PUT", "/rejected/:invoiceId")
@HttpMiddleware([HasApiKeyMiddleware])
@RestController()
export class RejectedInvoiceController implements Controller {
  constructor(
    @Inject(RejectedInvoiceService)
    private readonly rejectedInvoiceService: RejectedInvoiceService,
  ) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    const { invoiceId } = rejectedInvoiceSchema.parse(request.params)
    const apiKey = request.apiKey

    await this.rejectedInvoiceService.execute({
      key: apiKey,
      invoiceId,
    })

    return ok({ message: "Invoice rejected successfully" })
  }
}
