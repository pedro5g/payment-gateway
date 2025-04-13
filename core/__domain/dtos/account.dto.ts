export interface CreateAccountBodyDto {
  name: string
  email: string
}

export interface CreateAccountResponseDto {
  id: string
  name: string
  email: string
  balance: number
  APIKey: string
  createdAt: Date
  updatedAt: Date
}

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
