import { IApiKey } from "../interfaces/api-key.interface"

export interface CreateApiKeyBodyDto {
  accountId: string
}
export interface CreateApiKeyResponseDto {
  apiKey: IApiKey
}

export interface DisableApiKeyBodyDto {
  id: string
  accountId: string
}
export interface DisableApiKeyResponseDto {}

export interface ListAllApiKeyBodyDto {
  accountId: string
}

export interface ListAllApiKeyResponseDto {
  apiKeys: IApiKey[]
}
