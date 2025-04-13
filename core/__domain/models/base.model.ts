import { Entity } from "../entities/entity"

export interface IBaseModel<E extends Entity<any>> {
  save(entity: E): Promise<void>
  findById(id: string): Promise<E | null>
  delete(id: string): Promise<void>
  update(entity: E): Promise<void>
}
