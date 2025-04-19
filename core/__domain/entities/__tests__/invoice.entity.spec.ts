import { randomUUID } from "node:crypto"
import { Invoice } from "../invoice.entity"
import { Status } from "../../../__domain/interfaces/invoice.interface"

const accountId = randomUUID()
let sut: Invoice
describe("[Invoice] unit tests", () => {
  beforeEach(() => {
    sut = Invoice.create({
      accountId,
      amount: 100,
      paymentType: "card",
    })
  })

  test("Create instance of Invoice entity", () => {
    expect(sut).toBeTruthy()

    expect(sut.id).toBeTruthy()
    expect(sut.accountId).toStrictEqual(accountId)
    expect(sut.amount).toStrictEqual(100)
    expect(sut.status).toStrictEqual("pending")
    expect(sut.description).toStrictEqual(null)
    expect(sut.paymentType).toStrictEqual("card")
    expect(sut.createdAt).toBeTruthy()
    expect(sut.updatedAt).toBeTruthy()
  })

  test("Convert object literal to instance of invoice", () => {
    const objectLiteral = {
      id: randomUUID(),
      accountId,
      description: "test",
      status: Status.Approved,
      paymentType: "card",
      amount: 1200,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const invoice = Invoice.create(objectLiteral)
    expect(invoice).toBeTruthy()
    expect(invoice.id).toStrictEqual(objectLiteral.id)
    expect(invoice.accountId).toStrictEqual(objectLiteral.accountId)
    expect(invoice.description).toStrictEqual(objectLiteral.description)
    expect(invoice.status).toStrictEqual(objectLiteral.status)
    expect(invoice.paymentType).toStrictEqual(objectLiteral.paymentType)
    expect(invoice.amount).toStrictEqual(objectLiteral.amount)
    expect(invoice.createdAt).toStrictEqual(objectLiteral.createdAt)
    expect(invoice.updatedAt).toStrictEqual(objectLiteral.updatedAt)
  })

  test("Update description", () => {
    expect(sut.description).toBeFalsy()
    sut.description = "test"
    expect(sut.description).toStrictEqual("test")
    sut.description = null
    expect(sut.description).toBeFalsy()
  })

  test("Aprove invoice", () => {
    expect(sut.approvedInvoice).toBeTruthy()

    sut.approvedInvoice()
    expect(sut.status).toStrictEqual("approved")
  })
  test("Rejected invoice", () => {
    expect(sut.rejectedInvoice).toBeTruthy()

    sut.rejectedInvoice()
    expect(sut.status).toStrictEqual("rejected")
  })
})
