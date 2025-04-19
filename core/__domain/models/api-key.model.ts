import { ApiKey } from "../entities/api-key.entity"
import { IBaseModel } from "./base.model"

export interface IApiKeyModel
  extends Pick<IBaseModel<ApiKey>, "save" | "findById" | "update"> {
  genApiKey(): Promise<string>
  listByAccountId(accountId: string): Promise<ApiKey[]>
}
