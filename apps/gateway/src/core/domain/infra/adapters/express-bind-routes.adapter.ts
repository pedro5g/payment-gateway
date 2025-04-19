import { Express, RequestHandler } from "express"
import { ControllerInstance } from "../../../../../../../core/__domain/infra/controller"
import { adapterRoute } from "./express-router.adapter"
import { adapterMiddleware } from "./express-middleware.adapter"
import { env } from "../../../../../../../core/env"

export type Path = "get" | "post" | "delete" | "put" | "patch"

export const adapterBindRoutes = (controllers: ControllerInstance[]) => {
  return (app: Express) => {
    controllers.forEach((controller) => {
      const method = controller.method?.toLowerCase() as Path
      const path = controller.path
      const _middlewares = controller.middlewares || []

      if (!method)
        throw Error(
          `Method property is missing in [${controller.constructor.name}] please use @HttpMethod()`,
        )
      if (!path)
        throw Error(
          `Path property is missing in [${controller.constructor.name}] please use @HttpMethod()`,
        )

      if (_middlewares.length) {
        const preHandler: RequestHandler[] = []

        _middlewares.forEach((Middleware) => {
          preHandler.push(adapterMiddleware(new Middleware()))
        })

        app[method](
          `/${env.BASE_PATH}/gateway${path}`,
          ...preHandler,
          adapterRoute(controller),
        )
      } else {
        app[method](
          `/${env.BASE_PATH}/gateway${path}`,
          adapterRoute(controller),
        )
      }
    })

    return app
  }
}
