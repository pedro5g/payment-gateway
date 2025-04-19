import { IEntity } from "./entity.interface"

export interface IApiKey extends IEntity {
  accountId: string
  key: string
  active: boolean
}
