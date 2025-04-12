export const uuidRegex =
  /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

export async function sleep(ms: number = 1000) {
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
