import { IEntity } from "core/__domain/interfaces/entity.interface"
import { Entity } from "../entity"
import { uuidRegex } from "../../../../test/shared/utils"

class FakeEntity extends Entity<{ name: string } & IEntity> {
  static create({ name }: { name: string }) {
    return new FakeEntity({ name })
  }
  get name() {
    return this.props.name
  }
  set name(value: string) {
    this.onUpdate()
    this.props.name = value
  }
}

describe("[Entity] unite tests", () => {
  test("Create new instance of entity", () => {
    const fakeEntity = FakeEntity.create({ name: "jon bue" })

    expect(fakeEntity).toBeTruthy()
    expect(fakeEntity.name).toStrictEqual("jon bue")
    expect(fakeEntity.id).toBeTruthy()
    expect(uuidRegex.test(fakeEntity.id)).toBeTruthy()
    expect(fakeEntity.createdAt).toBeTruthy()
    expect(fakeEntity.updatedAt).toBeTruthy()
  })

  test("Update updatedAt on update some prop", async () => {
    const fakeEntity = FakeEntity.create({ name: "jon bue" })
    expect(fakeEntity["onUpdate"]).toBeTruthy()
    // @ts-ignore
    const spyOnUpdate = jest.spyOn(fakeEntity, "onUpdate")

    fakeEntity.name = "jon test"
    expect(fakeEntity.name).toStrictEqual("jon test")
    expect(spyOnUpdate).toHaveBeenCalledTimes(1)
  })

  test("Compare two instance of objects", () => {
    const fakeEntity = FakeEntity.create({ name: "jon bue" })
    const fakeEntity2 = FakeEntity.create({ name: "jon" })

    const spyEquals = jest.spyOn(fakeEntity, "equals")

    expect(fakeEntity.equals).toBeTruthy()
    expect(fakeEntity.equals(fakeEntity)).toStrictEqual(true)
    expect(fakeEntity.equals(fakeEntity2)).toStrictEqual(false)
    expect(spyEquals).toHaveBeenCalledTimes(2)
  })
})
