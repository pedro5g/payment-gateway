import { RestDecorators } from "../index"

let sut: ReturnType<typeof RestDecorators>
describe("[Rest Decorators] unit tests", () => {
  beforeEach(() => {
    sut = RestDecorators()
  })

  test("Initialize new rest context", () => {
    expect(sut).toBeTruthy()
    expect(sut.Register).toBeTruthy()
    expect(sut.Inject).toBeTruthy()
    expect(sut.Service).toBeTruthy()
    expect(sut.RestController).toBeTruthy()
    expect(sut.Module).toBeTruthy()
    expect(sut.HttpMethod).toBeTruthy()
    expect(sut.HttpMiddleware).toBeTruthy()
    expect(sut.register).toBeTruthy()
    expect(sut.factory).toBeTruthy()
    expect(sut.getController).toBeTruthy()
    expect(sut.metadataMap).toBeTruthy()
    expect(sut.controllerMap).toBeTruthy()
  })

  test("[@Register()]", () => {
    const { Register, metadataMap } = sut

    const spyMetadataMap = jest.spyOn(metadataMap, "set")
    @Register()
    class Sut {}

    expect(metadataMap.get(Sut)).toBeTruthy()
    expect(metadataMap.get(Sut)).toBeInstanceOf(Sut)
    expect(spyMetadataMap).toHaveBeenCalledTimes(1)
  })

  test("register fn", () => {
    const { register, metadataMap } = sut
    const spyMetadataMapSet = jest.spyOn(metadataMap, "set")
    const spyMetadataMapHas = jest.spyOn(metadataMap, "has")
    class Sut {}

    register(() => Sut)
    expect(metadataMap.get(Sut)).toBeTruthy()
    expect(metadataMap.get(Sut)).toBeInstanceOf(Sut)

    expect(spyMetadataMapHas).toHaveBeenCalledTimes(1)
    expect(spyMetadataMapSet).toHaveBeenCalledTimes(1)
  })

  test("[factory, @Inject()]", () => {
    const { factory, Inject } = sut

    class Sut {
      constructor(@Inject("test") public name: string) {}
    }

    const sutInstance = factory(Sut)

    expect(sutInstance).toBeTruthy()
    expect(sutInstance.name).toBeTruthy()
    expect(sutInstance.name).toBe("test")
  })

  test("[@Service(), @Inject()]", () => {
    const { Service, Register, Inject, metadataMap } = sut
    @Register()
    class Repository {
      public name = "test"
    }

    @Service()
    class Sut {
      constructor(@Inject(Repository) public repository: Repository) {}
    }

    expect(metadataMap.get(Sut)).toBeTruthy()
    expect(metadataMap.get(Sut).repository).toBeTruthy()
    expect(metadataMap.get(Sut).repository.name).toStrictEqual("test")
  })

  test("[@HttpMethod()]", () => {
    const { HttpMethod } = sut

    @HttpMethod("GET", "/test")
    class Sut {}
    const sutInstance = new Sut() as { method: string; path: string }

    expect(sutInstance).toBeTruthy()
    expect(sutInstance.method).toBeTruthy()
    expect(sutInstance.method).toBe("GET")
    expect(sutInstance.path).toBeTruthy()
    expect(sutInstance.path).toBe("/test")
  })

  test("[@HttpMiddleware()]", () => {
    const { HttpMiddleware } = sut

    class MiddlewareTest {
      public name = "test"
    }

    @HttpMiddleware([MiddlewareTest as any])
    class Sut {}
    const sutInstance = new Sut()
    expect(sutInstance).toBeTruthy()
    //@ts-ignore
    expect(sutInstance.middlewares.length).toBeTruthy()
    //@ts-ignore
    expect(new sutInstance.middlewares[0]().name).toBe("test")
  })

  test("[@RestController()]", () => {
    const { RestController, Inject, factory, controllerMap } = sut

    @RestController()
    class SutController {
      constructor(@Inject("test") public name: string) {}
    }

    expect(controllerMap.get(SutController)).toBeTruthy()
    const controllerInstance = factory(SutController)
    expect(controllerInstance.name).toBeTruthy()
    expect(controllerInstance.name).toBe("test")
  })

  test("[@Module()]", () => {
    const { RestController, Inject, Module } = sut

    @RestController()
    class SutController {
      constructor(@Inject("test") public name: string) {}
    }

    @Module({
      controllers: [SutController as any],
      providers: [],
    })
    class SutModule {}

    const sutModule = new SutModule()
    //@ts-ignore
    expect(sutModule.controllers.length).toBeTruthy()
    //@ts-ignore
    expect(sutModule.controllers[0].name).toBe("test")
  })
})
