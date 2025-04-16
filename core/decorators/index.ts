import { Controller } from "../__domain/infra/controller"
import { Middleware } from "../__domain/infra/middleware"

export interface Constructable<T = any> {
  new (...args: any[]): T
}
export type HTTP_METHODS = "GET" | "POST" | "DELETE" | "PUT" | "PATCH"
export type PATH = `/${string}`
export type MIDDLEWARES = Constructable<Middleware>[]

export interface ModuleConfig {
  providers: Constructable[]
  controllers: (new (...args: any[]) => Controller)[]
}

export function RestDecorators() {
  const metadataMap = new Map()
  const controllerMap = new Map()
  /**
   * @description - register is utility function that works as accessor,
   * registering instance of class within metadata, this function registering class without ``@Register()`` decorator
   *
   * @param fn - fn must be returning a Class
   * @example class Example {}
   * ✅ register(() => Example)
   * ❌ register(() => new Example())
   */
  function register(fn: () => Constructable) {
    const _instance = fn() // exec fn and get class
    const instance = new _instance() // create a instance
    // check if instance already exist
    if (metadataMap.has(instance)) return
    // set in metadata, using object instance with key of same object instance
    // thus allowing gets instance by @Inject(Example)
    metadataMap.set(_instance, instance)
  }

  /**
   * @description - Register instance of class that's decorated class in metadata
   * @example
   * `@Register()`
   *  class Example {}
   */
  function Register() {
    return (target: Constructable) => {
      const instance = new target()
      metadataMap.set(target, instance)
    }
  }

  /**
   * @description Inject, injects a instance of object in a param
   * @param value - class that must be injected
   * @example
   * class Example {
   *   constructor(@Inject(ClassInjectable) params: ClassInjectable){}
   * }
   */
  function Inject<T>(value: T) {
    return (
      target: Constructable,
      _key: PropertyKey = "",
      paramIndex: number,
    ) => {
      // try get already existing params, in first moment that's given an empty array
      const existingParams = metadataMap.get(target) || []
      // set value in param index
      existingParams[paramIndex] = value
      // save in metadata
      metadataMap.set(target, existingParams)
    }
  }

  /**
   * @description Service, create a service instance and save in metadata
   * @example
   * `@Service()`
   * class ExampleService {}
   */
  function Service() {
    return (target: Constructable) => {
      const instance = factory(target)
      metadataMap.set(target, instance)
    }
  }

  function HttpMethod(method: HTTP_METHODS, path: PATH = "/") {
    return (target: Constructable) => {
      Object.assign(target.prototype, { method, path })
    }
  }

  function HttpMiddleware(middlewares: MIDDLEWARES = []) {
    return (target: Constructable) => {
      Object.assign(target.prototype, { middlewares })
    }
  }

  /**
   * @description RestController, create a controller instance and save in controller metadata
   * @example
   * `@RestController()`
   * class ExampleController {}
   */
  function RestController() {
    return (target: Constructable) => {
      const instance = factory(target)
      controllerMap.set(target, instance)
    }
  }

  /**
   * @description Module load all controllers file and register and load externals providers
   * @param config - recibes a controller array thats decorated with ``@ControllerRest()``
   * and providers array ``providers`` are class requested by others services such as (Service, Repositories)
   */
  function Module(config: ModuleConfig) {
    return function <T extends Constructable>(target: T): T {
      // expends class setting controllers property
      return class extends target {
        public controllers: Controller[]

        constructor(...args: any[]) {
          super(...args)
          const { providers, controllers } = config
          // load providers
          ;(providers || []).forEach((provider) => {
            register(() => provider)
          })
          // load controllers
          this.controllers = (controllers || []).map((controller) => {
            return getController(controller)
          })
        }
      }
    }
  }

  /**
   * @description factory is utility function thats constructor a object instance
   * injecting all dependencies required
   * @param clazz - constructor class
   * @returns instance of clazz
   * @example
   * class Example {
   *  constructor(@Inject(ClassService) service: ClassService) {}
   * }
   *
   * const example = factory(Example) -> new Example(new ClassService())
   *
   */
  function factory<T extends Constructable>(clazz: T): InstanceType<T> {
    // get all class dependencies and iterable getting each object instance
    const dependencies = (metadataMap.get(clazz) || []).map(
      (dep: Constructable) => {
        const instance = metadataMap.get(dep)

        return instance ?? resolveDep(dep)
      },
    )
    return new clazz(...dependencies)
  }

  function resolveDep(dep: unknown) {
    if (isFunction(dep)) {
      return new dep()
    }
    return dep
  }

  /**
   * @description get a controller instance
   * - obs: only controllers decorated with ``@ControllerRest()``
   * and with file loaded
   *
   * @param controller - controller class
   * @returns controller instance or undefined
   * @example
   * const controller = getController(Controller)
   */
  function getController<T>(controller: T) {
    return controllerMap.get(controller) as Controller
  }

  //   /**
  //    * @description create all instances of controller loaded on module
  //    * @returns returns Controller[]
  //    */

  //   function makeControllers(): Controller[] {
  //     //convert Map to Set, there is prevent duplicated value
  //     const sets = new Set(controllerMap.values())
  //     const controllers = Array.from(sets.values())
  //     return controllers
  //   }
  return {
    Register,
    Service,
    RestController,
    HttpMethod,
    HttpMiddleware,
    Inject,
    Module,
    metadataMap,
    controllerMap,
    getController,
    factory,
    register,
  }
}

export type PrimitiveType =
  | "string"
  | "number"
  | "object"
  | "boolean"
  | "function"
  | "symbol"

function checkType(type: PrimitiveType, data: unknown) {
  const normalizeType = type[0].toUpperCase() + type.slice(1).toLowerCase()
  return Object.prototype.toString.call(data) === `[object ${normalizeType}]`
}

function isFunction(dep: unknown): dep is Constructable {
  return checkType("function", dep)
}
