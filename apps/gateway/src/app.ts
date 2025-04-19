import express from "express"
import { ControllerInstance } from "../../../core/__domain/infra/controller"
import { GlobalErrorHandler } from "../../../core/middlewares/global-error-handler"
import { GateWayModule } from "./modules/gateway.module"
import { adapterBindRoutes } from "./core/domain/infra/adapters/express-bind-routes.adapter"
import { adapterErrorHandler } from "./core/domain/infra/adapters/express-error-handler.adapter"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const gatewayModule = new GateWayModule() as {
  controllers: ControllerInstance[]
}
const globalErrorHandler = new GlobalErrorHandler()
adapterBindRoutes(gatewayModule.controllers)(app)

app.use(adapterErrorHandler(globalErrorHandler))

export { app }
