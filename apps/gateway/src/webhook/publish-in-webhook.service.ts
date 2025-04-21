import { Logger } from "../../../../core/logger"
import https from "node:https"

export interface PublishInWebhookBodyDto {
  url: string
  body: unknown
}

export class PublishInWebhookService {
  private readonly logger = new Logger(PublishInWebhookService.name)
  constructor() {}

  async execute({ url, body }: PublishInWebhookBodyDto) {
    this.logger.warn(`Try publish in webhook to ${url}`)
    return new Promise((resolve, reject) => {
      https
        .request(
          url,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "content-length": Buffer.byteLength(JSON.stringify(body)),
            },
          },
          (res) => {
            let data = ""

            res.on("data", (chunk: string) => {
              data += chunk
            })

            res.on("end", () => {
              try {
                const response = JSON.parse(data)
                resolve(response)
              } catch (error) {
                reject(new Error("Failed to parse JSON response"))
              }
            })
          },
        )
        .on("error", (error: Error) => {
          reject(error)
        })
    })
  }
}
