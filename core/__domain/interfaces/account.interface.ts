import { IEntity } from "./entity.interface"

export interface IAccount extends IEntity {
  name: string
  email: string
  balance: number
  APIKey: string
}
