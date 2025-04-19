import { randomUUID } from "node:crypto"
import { ApiKey } from "../api-key.entity"
import { genAPIKey } from "../../../utils/gen-api-key"

const accountId = randomUUID()
let sut: ApiKey
describe("[ApiKey] unit tests", () => {
  beforeEach(() => {
    sut = ApiKey.create({
      key: genAPIKey(),
      accountId,
    })
  })

  test("Create instance of ApiKey entity", () => {
    expect(sut).toBeTruthy()

    expect(sut.id).toBeTruthy()
    expect(sut.accountId).toBeTruthy()
    expect(sut.key).toBeTruthy()
    expect(sut.active).toBeTruthy()
    expect(sut.createdAt).toBeTruthy()
    expect(sut.updatedAt).toBeTruthy()
  })

  test("Convert object literal to instance of apiKey", () => {
    const objectLiteral = {
      id: randomUUID(),
      accountId,
      key: genAPIKey(),
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const apiKey = ApiKey.create(objectLiteral)

    expect(apiKey.id).toStrictEqual(objectLiteral.id)
    expect(apiKey.accountId).toStrictEqual(objectLiteral.accountId)
    expect(apiKey.key).toStrictEqual(objectLiteral.key)
    expect(apiKey.active).toStrictEqual(objectLiteral.active)
    expect(apiKey.createdAt).toStrictEqual(objectLiteral.createdAt)
    expect(apiKey.updatedAt).toStrictEqual(objectLiteral.updatedAt)
  })

  test("Disable api key", () => {
    expect(sut.active).toBeTruthy()
    expect(sut.disable).toBeTruthy()
    sut.disable()
    expect(sut.active).toBeFalsy()
  })
})
