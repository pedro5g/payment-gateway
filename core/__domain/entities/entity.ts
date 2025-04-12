import { randomUUID } from "node:crypto"
import { IEntity } from "../interfaces/entity.interface"
import { Optional } from "types/optional"

export abstract class Entity<T extends IEntity> {
  private _id: string
  private _createdAt: Date
  private _updatedAt: Date
  protected props: T

  protected constructor(
    props: Optional<T & IEntity, "id" | "createdAt" | "updatedAt">,
  ) {
    this._id = props.id ?? randomUUID()
    this._createdAt = props.createdAt ?? new Date()
    this._updatedAt = props.updatedAt ?? new Date()
    this.props = props as T
  }

  get id(): string {
    return this._id
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get updatedAt(): Date {
    return this._updatedAt
  }

  protected onUpdate() {
    this._updatedAt = new Date()
  }

  public equals(entity: Entity<any>): boolean {
    if (entity === this) {
      return true
    }
    if (entity.id === this._id) {
      return true
    }
    return false
  }
}
