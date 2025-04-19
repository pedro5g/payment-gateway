import { Optional } from "types/optional"
import { IApiKey } from "../interfaces/api-key.interface"
import { Entity } from "./entity"

export class ApiKey extends Entity<IApiKey> {
  static create(
    props: Optional<IApiKey, "id" | "createdAt" | "updatedAt" | "active">,
  ) {
    return new ApiKey({
      ...props,
      id: props.id,
      active: props.active ?? true,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    })
  }

  get accountId(): string {
    return this.props.accountId
  }

  get key(): string {
    return this.props.key
  }

  get active(): boolean {
    return this.props.active
  }

  public disable() {
    if (this.props.active) {
      this.props.active = false
      this.onUpdate()
    }
  }
}
