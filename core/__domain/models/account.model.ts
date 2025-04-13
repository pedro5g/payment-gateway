import { Account } from "../entities/account.entity"
import { IBaseModel } from "./base.model"

export interface IAccountModel extends IBaseModel<Account> {
  findByEmail(email: string): Promise<Account | null>
  findByAPIKey(apiKey: string): Promise<Account | null>
  updateBalance(entity: Account): Promise<void>
  genApiKey(): Promise<string>
}
