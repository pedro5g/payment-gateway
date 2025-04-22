import { Logger } from "../../../../core/logger"

export interface PublishInWebhookBodyDto {
  url: string
  body: unknown
}

export class PublishInWebhookService {
  private readonly logger = new Logger(PublishInWebhookService.name)
  constructor() {}

  async execute({ url, body }: PublishInWebhookBodyDto) {
    this.logger.warn(`Try publish in webhook to ${url}`)

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      })

      const response = await res.json()
      return response
    } catch (e) {
      return e
    }
  }
}
