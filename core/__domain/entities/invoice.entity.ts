import { Optional } from "types/optional"
import { IInvoice, Status } from "../interfaces/invoice.interface"
import { Entity } from "./entity"

export class Invoice extends Entity<IInvoice> {
  static create(
    props: Optional<IInvoice, "id" | "createdAt" | "updatedAt" | "status">,
  ): Invoice {
    return new Invoice({
      ...props,
      id: props.id,
      status: props.status || Status.Pending,
      amount: Math.round(props.amount * 100),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    })
  }
  get accountId(): string {
    return this.props.accountId
  }
  get description(): string | null {
    return this.props.description
  }
  set description(value: string | null) {
    this.props.description = value
    this.onUpdate()
  }
  get amount(): number {
    return this.props.amount / 100
  }
  get status(): Status {
    return this.props.status
  }
  get paymentType(): string {
    return this.props.paymentType
  }

  get cardLastDigits(): string {
    return this.props.cardLastDigits
  }

  public approvedInvoice() {
    if (this.props.status === Status.Pending) {
      this.props.status = Status.Approved
      this.onUpdate()
    }
  }

  public rejectedInvoice() {
    if (this.props.status === Status.Pending) {
      this.props.status = Status.Rejected
      this.onUpdate()
    }
  }
}
