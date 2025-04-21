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
import { createInvoiceSchema } from "../../../../core/validators/invoice.validator"
import { CreateInvoiceService } from "../services/create-invoice.service"
import { HasApiKeyMiddleware } from "../../../../core/middlewares/has-api-key"

@HttpMethod("POST", "/create")
@HttpMiddleware([HasApiKeyMiddleware])
@RestController()
export class CreateInvoiceController implements Controller {
  constructor(
    @Inject(CreateInvoiceService)
    private readonly createInvoiceService: CreateInvoiceService,
  ) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    const { amount, description, paymentType } = createInvoiceSchema.parse(
      request.body,
    )
    const apiKey = request.apiKey

    const invoice = await this.createInvoiceService.execute({
      apiKey,
      amount,
      description,
      paymentType,
    })

    return created({ message: "Invoice create successfully", invoice })
  }
}
