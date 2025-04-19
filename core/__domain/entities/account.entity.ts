import { Optional } from "types/optional"
import { Entity } from "./entity"
import { IAccount } from "../interfaces/account.interface"
import { IApiKey } from "../interfaces/api-key.interface"

export class Account extends Entity<IAccount> {
  static create(
    props: Optional<
      IAccount,
      "id" | "createdAt" | "updatedAt" | "balance" | "apiKeys" | "webhookUrl"
    >,
  ): Account {
    return new Account({
      ...props,
      id: props.id,
      balance: Math.round((props.balance || 0) * 100),
      apiKeys: props.apiKeys ?? [],
      webhookUrl: props.webhookUrl || null,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    })
  }

  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
    this.onUpdate()
  }

  get email() {
    return this.props.email
  }

  get apiKeys(): IApiKey[] {
    return this.props.apiKeys
  }

  set apiKeys(value: IApiKey | IApiKey[]) {
    this.props.apiKeys = Array.isArray(value) ? value : [value]
  }

  get webhookUrl() {
    return this.props.webhookUrl
  }

  set webhookUrl(value: string | null) {
    this.props.webhookUrl = value
    this.onUpdate()
  }

  get balance() {
    return this.toBalance(this.props.balance)
  }

  get balanceInCents() {
    return this.props.balance
  }

  public addBalance(value: number): void {
    this.props.balance = this.props.balance + this.toCents(value)
    this.onUpdate()
  }
  public removeBalance(value: number): void {
    const balanceInCents = Math.round(
      (this.toBalance(this.props.balance) - value) * 100,
    )
    this.props.balance = balanceInCents
    this.onUpdate()
  }

  private toCents(value: number) {
    return Math.round(value * 100)
  }
  private toBalance(value: number) {
    return value / 100
  }
}
