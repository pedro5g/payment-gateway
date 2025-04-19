import { IAccount } from "../interfaces/account.interface"

// create account dto
export interface CreateAccountBodyDto {
  name: string
  email: string
}
export interface CreateAccountResponseDto {
  account: IAccount
}

// enter in account dto
export interface EnterInAccountBodyDto {
  email: string
}
export interface EnterInAccountResponseDto {
  account: IAccount
}

// get profile by id dto
export interface ProfileBodyDto {
  id: string
}
export interface ProfileResponseDto {
  account: IAccount
}

// get account dto
export interface GetAccountBodyDto {
  apiKey: string
}
export interface GetAccountResponseDto {
  id: string
  name: string
  email: string
  balance: number
  APIKey: string
  createdAt: Date
  updatedAt: Date
}

//update webhook url dto
export interface UpdateWebhookBodyDto {
  accountId: string
  webhookUrl: string | null
}
export interface UpdateWebhookResponseDto {}
