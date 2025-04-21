import { Controller } from "../../../../core/__domain/infra/controller"
import {
  HttpMethod,
  HttpMiddleware,
  Inject,
  RestController,
} from "../core/domain/infra/decorators"
import { HttpResponse, ok } from "../../../../core/__domain/infra/http-response"
import { HttpRequest } from "../../../../core/__domain/infra/http-request"
import { approvedInvoiceSchema } from "../../../../core/validators/gateway.validator"
import { HasApiKeyMiddleware } from "../../../../core/middlewares/has-api-key"
import { ApprovedInvoiceService } from "../services/approved-invoice.service"

@HttpMethod("PUT", "/approved/:invoiceId")
@HttpMiddleware([HasApiKeyMiddleware])
@RestController()
export class ApprovedInvoiceController implements Controller {
  constructor(
    @Inject(ApprovedInvoiceService)
    private readonly approvedInvoiceService: ApprovedInvoiceService,
  ) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    const { invoiceId } = approvedInvoiceSchema.parse(request.params)
    const apiKey = request.apiKey

    await this.approvedInvoiceService.execute({
      key: apiKey,
      invoiceId,
    })

    return ok({ message: "Invoice approved successfully" })
  }
}
