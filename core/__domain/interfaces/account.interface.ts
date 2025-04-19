import { IApiKey } from "./api-key.interface"
import { IEntity } from "./entity.interface"

export interface IAccount extends IEntity {
  name: string
  email: string
  balance: number
  apiKeys: IApiKey[]
  webhookUrl: string | null
}
