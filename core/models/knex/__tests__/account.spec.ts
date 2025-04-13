import Knex from "knex"
import { setupKnexSchemaTest } from "../../../../test/shared/setup-knex-schema-test"
import { Context } from "../context"
import { IAccountModel } from "../../../__domain/models/account.model"
import { Account } from "../../../../core/__domain/entities/account.entity"

let sut: IAccountModel
let ctx: Context
let db: ReturnType<typeof Knex>
let teardown: () => Promise<void>

beforeAll(async () => {
  const setup = await setupKnexSchemaTest()
  db = setup.db
  teardown = setup.teardown

  ctx = new Context()
  ctx.db = db
  // @ts-ignore
  ctx.accounts["knex"] = db
  sut = ctx.accounts
})

afterAll(async () => {
  return await teardown()
})

describe("[Account model] unit test", () => {
  test("Multi models transaction", async () => {
    const createAccountData = {
      name: "test 0",
      email: "test0@gmail.com",
      APIKey: "test_api_key_0",
    }
    const account = Account.create(createAccountData)
    await ctx.knexTransaction(
      async () => {
        await sut.save(account)
        throw new Error()
      },
      () => {},
    )

    const accountOnDb = await db("accounts")
      .select()
      .where({
        email: createAccountData.email,
      })
      .first()

    expect(accountOnDb).toBeFalsy()
  })
  it("Should be able to register an account", async () => {
    const createAccountData = {
      name: "test",
      email: "test@gmail.com",
      APIKey: "test_api_key",
    }
    const account = Account.create(createAccountData)
    await sut.save(account)
    const accountOnDb = await db("accounts")
      .select()
      .where({
        email: createAccountData.email,
      })
      .first()

    expect(accountOnDb).toBeTruthy()
    expect(accountOnDb?.name).toStrictEqual(createAccountData.name)
    expect(accountOnDb?.email).toStrictEqual(createAccountData.email)
    expect(accountOnDb?.api_key).toStrictEqual(createAccountData.APIKey)
  })

  it("Should be able find account by id", async () => {
    const createAccountData = {
      name: "test 2",
      email: "test2@gmail.com",
      APIKey: "test_api_key_2",
    }
    const account = Account.create(createAccountData)
    await sut.save(account)

    const findAccount = await sut.findById(account.id)
    expect(findAccount).toBeTruthy()
    expect(findAccount?.name).toStrictEqual(createAccountData.name)
    expect(findAccount?.email).toStrictEqual(createAccountData.email)
    expect(findAccount?.APIKey).toStrictEqual(createAccountData.APIKey)
    expect(findAccount?.balance).toStrictEqual(account.balance)
    expect(findAccount?.createdAt).toStrictEqual(account.createdAt)
    expect(findAccount?.updatedAt).toStrictEqual(account.updatedAt)
  })
  it("Should be able find account by email", async () => {
    const createAccountData = {
      name: "test 3",
      email: "test3@gmail.com",
      APIKey: "test_api_key_3",
    }
    const account = Account.create(createAccountData)
    await sut.save(account)

    const findAccount = await sut.findByEmail(createAccountData.email)
    expect(findAccount).toBeTruthy()
    expect(findAccount?.name).toStrictEqual(createAccountData.name)
    expect(findAccount?.email).toStrictEqual(createAccountData.email)
    expect(findAccount?.APIKey).toStrictEqual(createAccountData.APIKey)
    expect(findAccount?.balance).toStrictEqual(account.balance)
    expect(findAccount?.createdAt).toStrictEqual(account.createdAt)
    expect(findAccount?.updatedAt).toStrictEqual(account.updatedAt)
  })
  it("Should be able find account by api key", async () => {
    const createAccountData = {
      name: "test 4",
      email: "test4@gmail.com",
      APIKey: "test_api_key_4",
    }
    const account = Account.create(createAccountData)
    await sut.save(account)

    const findAccount = await sut.findByAPIKey(createAccountData.APIKey)
    expect(findAccount).toBeTruthy()
    expect(findAccount?.name).toStrictEqual(createAccountData.name)
    expect(findAccount?.email).toStrictEqual(createAccountData.email)
    expect(findAccount?.APIKey).toStrictEqual(createAccountData.APIKey)
    expect(findAccount?.balance).toStrictEqual(account.balance)
    expect(findAccount?.createdAt).toStrictEqual(account.createdAt)
    expect(findAccount?.updatedAt).toStrictEqual(account.updatedAt)
  })

  it("Should be able update account", async () => {
    const createAccountData = {
      name: "test 5",
      email: "test5@gmail.com",
      APIKey: "test_api_key_5",
    }
    const account = Account.create(createAccountData)
    await sut.save(account)

    account.name = "test 5 updated"
    await sut.update(account)

    const accountOnDb = await db("accounts")
      .select()
      .where({
        email: createAccountData.email,
      })
      .first()

    expect(accountOnDb).toBeTruthy()
    expect(accountOnDb?.name).toStrictEqual("test 5 updated")
  })

  it("Should be able update balance", async () => {
    const createAccountData = {
      name: "test 6",
      email: "test6@gmail.com",
      APIKey: "test_api_key_6",
      balance: 2000,
    }
    const account = Account.create(createAccountData)
    await sut.save(account)

    const removeBalance = (value: number) => {
      account.removeBalance(value)
      return account
    }

    const insetBalance = (value: number) => {
      account.addBalance(value)
      return account
    }

    await Promise.all([
      sut.updateBalance(insetBalance(500)),
      sut.updateBalance(insetBalance(5000)),
      sut.updateBalance(removeBalance(500)),
      sut.updateBalance(insetBalance(1500)),
    ])

    const accountOnDb = await sut.findByEmail(createAccountData.email)

    expect(accountOnDb).toBeTruthy()
    expect(accountOnDb?.balance).toStrictEqual(8500)
  })

  it("Should be able delete account", async () => {
    const createAccountData = {
      name: "test 7",
      email: "test7@gmail.com",
      APIKey: "test_api_key_7",
    }
    const account = Account.create(createAccountData)
    await sut.save(account)

    let accountOnDb = await db("accounts")
      .select()
      .where({
        email: createAccountData.email,
      })
      .first()

    expect(accountOnDb).toBeTruthy()

    await sut.delete(account.id)

    accountOnDb = await db("accounts")
      .select()
      .where({
        email: createAccountData.email,
      })
      .first()

    expect(accountOnDb).toBeFalsy()
  })

  it("Generate and prevent unique api key", async () => {
    const apiKey = await sut.genApiKey()
    expect(apiKey).toBeTruthy()
  })
})
