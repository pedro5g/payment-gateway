import { FastifyInstance, preHandlerHookHandler } from "fastify"
import { ControllerInstance } from "../../../../../../../core/__domain/infra/controller"
import { adapterRoute } from "./fastify-router.adapter"
import { adapterMiddleware } from "./fastify-middleware.adapter"

export type Path = "get" | "post" | "delete" | "put" | "patch"

export const adapterBindRoutes = (controllers: ControllerInstance[]) => {
  return (app: FastifyInstance) => {
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
        const preHandler: preHandlerHookHandler[] = []

        _middlewares.forEach((Middleware) => {
          preHandler.push(adapterMiddleware(new Middleware()))
        })

        app[method](
          path,
          {
            preHandler,
          },
          adapterRoute(controller),
        )
      } else {
        app[method](path, adapterRoute(controller))
      }
    })

    return app
  }
}
