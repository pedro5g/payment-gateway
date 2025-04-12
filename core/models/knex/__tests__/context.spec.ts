import { Context } from "../context"

describe("[Context] unit tests", () => {
  test("Initialize new context", () => {
    const context = new Context()
    expect(context).toBeTruthy()
    expect(context.accounts).toBeTruthy()
  })
})
