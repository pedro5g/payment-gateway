import { Account } from "../entities/account.entity"
import { IRepository } from "./repository"

export interface IAccountRepository extends IRepository<Account> {
  findByEmail(email: string): Promise<Account | null>
  findByAPIKey(apiKey: string): Promise<Account | null>
  updateBalance(entity: Account): Promise<void>
  genApiKey(): Promise<string>
}
