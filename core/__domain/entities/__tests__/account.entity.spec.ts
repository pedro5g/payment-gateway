import { randomUUID } from "node:crypto"
import { genAPIKey } from "../../../utils/gen-api-key"
import { Account } from "../account.entity"
import { ApiKey } from "../api-key.entity"

let sut: Account
const accountTestData = {
  name: "test",
  email: "test@gmail.com",
  apiKeys: [],
}

describe("[Account] unit tests", () => {
  beforeEach(() => {
    sut = Account.create(accountTestData)
  })
  test("Create instance of Account", () => {
    expect(sut.name).toStrictEqual(accountTestData.name)
    expect(sut.email).toStrictEqual(accountTestData.email)
    expect(sut.apiKeys).toStrictEqual(accountTestData.apiKeys)
    expect(sut.balance).toStrictEqual(0)
    expect(sut.balanceInCents).toStrictEqual(0)
    expect(sut.webhookUrl).toStrictEqual(null)
    expect(sut.createdAt).toBeTruthy()
    expect(sut.updatedAt).toBeTruthy()
    expect(sut.id).toBeTruthy()
    expect(sut.equals).toBeTruthy()
    expect(sut.addBalance).toBeTruthy()
    expect(sut.removeBalance).toBeTruthy()
  })

  test("Convert object literal to instance of account", () => {
    const objectLiteral = {
      id: randomUUID(),
      name: "test",
      email: "test@gmail.com",
      APIKey: genAPIKey(),
      balance: 1200,
      createdAt: new Date(),
      updatedAt: new Date(),
      apiKeys: [],
    }

    const accountInstance = Account.create(objectLiteral)

    expect(accountInstance.id).toStrictEqual(objectLiteral.id)
    expect(accountInstance.name).toStrictEqual(objectLiteral.name)
    expect(accountInstance.email).toStrictEqual(objectLiteral.email)
    expect(accountInstance.balance).toStrictEqual(objectLiteral.balance)
    expect(accountInstance.balanceInCents).toStrictEqual(
      Math.round(objectLiteral.balance * 100),
    )
    expect(accountInstance.apiKeys).toStrictEqual(objectLiteral.apiKeys)
    expect(accountInstance.createdAt).toStrictEqual(objectLiteral.createdAt)
    expect(accountInstance.updatedAt).toStrictEqual(objectLiteral.updatedAt)
  })

  test("Add balance", () => {
    expect(sut.addBalance).toBeTruthy()

    // @ts-ignore
    const spyToCents = jest.spyOn(sut, "toCents")
    // @ts-ignore
    const spyToBalance = jest.spyOn(sut, "toBalance")
    const spyAddBalance = jest.spyOn(sut, "addBalance")

    expect(sut.balance).toStrictEqual(0)
    sut.addBalance(1500)
    expect(sut.balance).toStrictEqual(1500)
    expect(sut.balanceInCents).toStrictEqual(Math.round(1500 * 100))
    sut.addBalance(1500)
    expect(sut.balance).toStrictEqual(3000)
    expect(sut.balanceInCents).toStrictEqual(Math.round(3000 * 100))

    expect(spyAddBalance).toHaveBeenCalledTimes(2)
    expect(spyToCents).toHaveBeenCalledTimes(2)
    expect(spyToBalance).toHaveBeenCalledTimes(3)
  })

  test("Remove balance", () => {
    expect(sut.removeBalance).toBeTruthy()

    sut.addBalance(2_300.5)
    const spyRemoveBalance = jest.spyOn(sut, "removeBalance")

    sut.removeBalance(200.5)
    expect(sut.balance).toStrictEqual(2100)
    sut.removeBalance(0.5)
    expect(sut.balance).toStrictEqual(2_099.5)
    expect(spyRemoveBalance).toHaveBeenCalledTimes(2)
  })

  test("Add web hook", () => {
    sut.webhookUrl = "http://localhost:3000"
    expect(sut.webhookUrl).toStrictEqual("http://localhost:3000")
    sut.webhookUrl = null
    expect(sut.webhookUrl).toStrictEqual(null)
  })

  test("Add api key", () => {
    const apiKey = ApiKey.create({
      key: genAPIKey(),
      accountId: sut.id,
    })

    sut.apiKeys = apiKey
    expect(sut.apiKeys).toHaveLength(1)
    expect(sut.apiKeys[0].key).toStrictEqual(apiKey.key)
    expect(sut.apiKeys[0].accountId).toStrictEqual(sut.id)
  })
})
