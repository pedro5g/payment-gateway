import { Controller } from "../../../../core/__domain/infra/controller"
import {
  HttpMethod,
  HttpMiddleware,
  Inject,
  RestController,
} from "../core/domain/infra/decorators"
import { ProfileService } from "../services/profile.service"
import { HttpResponse, ok } from "../../../../core/__domain/infra/http-response"
import { HttpRequest } from "../../../../core/__domain/infra/http-request"
import { IsAuthenticated } from "../../../../core/middlewares/is-authenticated"

@HttpMethod("GET", "/me")
@HttpMiddleware([IsAuthenticated])
@RestController()
export class GetProfileController implements Controller {
  constructor(
    @Inject(ProfileService) private readonly profileService: ProfileService,
  ) {}

  async handler(request: HttpRequest): Promise<HttpResponse> {
    console.log("request", request)
    const id = request.userId || ""
    const { account } = await this.profileService.execute({ id })

    return ok({ message: "Profile", account })
  }
}
