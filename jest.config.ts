import { Config } from "jest"
import fs from "node:fs"

const swcrcConfig = JSON.parse(fs.readFileSync(`${__dirname}/.swcrc`, "utf-8"))

const config: Config = {
  displayName: {
    name: "Payment Gateway API v1",
    color: "cyanBright",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "./",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", { ...swcrcConfig }],
  },
  coverageProvider: "v8",
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
}

export default config
