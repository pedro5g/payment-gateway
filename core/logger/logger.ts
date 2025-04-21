import path from "node:path"
import util from "node:util"
import fs from "node:fs"
import { __dirname } from "../../dirname"

const stringTeg = "[object String]"
const isString = (value: unknown) =>
  typeof value === "string" ||
  (!Array.isArray(value) && Object.prototype.toString.call(value) === stringTeg)

export interface LoggerOptions {
  logFilePath?: string
  logToConsole?: boolean
}

export class Logger {
  private readonly context: string
  private readonly logFilePath: string
  private readonly logToConsole: boolean
  private readonly isTTYout: boolean

  private static contextRules: Record<string, number> = {}
  private readonly DEFAULT_CONTEXT
  private readonly DEFAULT_LEVEL = "info"
  private readonly LOG_LEVEL_MAP: Record<string, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  }

  constructor(context?: string, opts: LoggerOptions = {}) {
    const { logFilePath, logToConsole } = opts
    this.DEFAULT_CONTEXT = (context || "Logger").toLowerCase()
    this.context = context || "Logger"
    this.logFilePath = logFilePath || path.resolve(__dirname, "log.txt")
    this.logToConsole =
      typeof logToConsole !== "undefined" ? logToConsole : true
    this.isTTYout = process.stdout.isTTY

    if (!Object.keys(Logger.contextRules).length) {
      this.initializeContextRules()
    }
  }

  private log(msg: string) {
    process.stdout.write(msg)
  }

  info(message: string, consoleLog?: boolean): void {
    if (this.shouldLog("info", this.context)) {
      const labelInfo = this.isTTYout ? "\x1b[32mINFO\x1b[0m" : "INFO"
      const logMessage = `[${this.timestamp()}] ${labelInfo} (${this.context}): ${this.output(message)}\n`
      this.writeLog(logMessage, consoleLog)
    }
  }

  error(message: string, error?: unknown, consoleLog?: boolean): void {
    if (this.shouldLog("error", this.context)) {
      const labelError = this.isTTYout ? "\x1b[31mERROR!\x1b[0m" : "ERROR!"
      const logMessage = `[${this.timestamp()}] ${labelError} (${this.context}): ${this.output(message)} ${error && util.inspect(error)}\n`
      this.writeLog(logMessage, consoleLog)
    }
  }

  warn(message: string, consoleLog?: boolean): void {
    if (this.shouldLog("warn", this.context)) {
      const labelWarn = this.isTTYout ? "\x1b[33mWARN\x1b[0m" : "WARN"
      const logMessage = `[${this.timestamp()}] ${labelWarn} (${this.context}): ${this.output(message)}\n`
      this.writeLog(logMessage, consoleLog)
    }
  }

  debug(message: string, consoleLog?: boolean): void {
    if (this.shouldLog("debug", this.context)) {
      const labelDebug = this.isTTYout ? "\x1b[34mDEBUG\x1b[0m" : "DEBUG"
      const logMessage = `[${this.timestamp()}] ${labelDebug} (${this.context}): ${this.output(message)}\n`
      this.writeLog(logMessage, consoleLog)
    }
  }

  private initializeContextRules() {
    const rules = process.env.LOG_RULES ?? ""

    if (!rules) {
      Logger.contextRules[this.DEFAULT_CONTEXT] =
        this.LOG_LEVEL_MAP[this.DEFAULT_LEVEL]
      return
    }

    rules
      .toLowerCase()
      .split("/")
      .forEach((rule) => {
        let contextPart = this.DEFAULT_CONTEXT
        let levelPart = this.DEFAULT_LEVEL
        const parts = rule.split(";")

        parts.forEach((part) => {
          if (part.startsWith("context=")) {
            contextPart = part.split("=")[1] || this.DEFAULT_CONTEXT
          }
          if (part.startsWith("level=")) {
            levelPart = part.split("=")[1] || this.DEFAULT_LEVEL
          }
        })

        const contexts = contextPart.split(",")
        const numericLevel =
          this.LOG_LEVEL_MAP[levelPart.trim()] ??
          this.LOG_LEVEL_MAP[this.DEFAULT_LEVEL]

        contexts.forEach((context) => {
          Logger.contextRules[context.trim()] = numericLevel
        })
      })
  }

  private shouldLog(methodLevel: string, context: string) {
    return (
      this.LOG_LEVEL_MAP[methodLevel] >= this.getLogLevel(context.toLowerCase())
    )
  }

  private output(msg: string) {
    return isString(msg) ? msg : util.inspect(msg)
  }

  private timestamp() {
    return new Date().toISOString()
  }

  private getLogLevel(context?: string) {
    context = context ?? ""
    const level =
      Logger.contextRules[context] ??
      Logger.contextRules[this.DEFAULT_CONTEXT] ??
      this.LOG_LEVEL_MAP[this.DEFAULT_LEVEL]

    return level
  }

  private writeLog(message: string, consoleLog?: boolean) {
    fs.appendFile(
      this.logFilePath,
      this.normalizeStrToSaveFile(message),
      (err) => {
        if (err) {
          console.error("Failed to write to log file", err)
        }
      },
    )

    if (this.checkConsoleLogPriority(consoleLog)) {
      this.log(message)
    }
  }

  private checkConsoleLogPriority(consoleLog?: boolean) {
    if (consoleLog !== undefined) return consoleLog
    return this.logToConsole
  }

  private normalizeStrToSaveFile(msg: string) {
    return msg.replace(/\x1b\[[0-9;]*m/g, "")
  }
}
