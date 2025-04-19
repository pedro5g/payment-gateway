import { IEntity } from "./entity.interface"

export enum Status {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export interface IInvoice extends IEntity {
  accountId: string
  amount: number
  status: Status
  description: string | null
  paymentType: string
}

export interface ICreditCard {
  number: number
  CVV: string
  expiryMonth: number
  expiryYear: number
  cardholderName: string
}
