import { Outlet } from "react-router"
import { Logo } from "../components/logo"

export function AuthLayout() {
  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
      <header className="fixed top-0 left-0 w-full p-8 ">
        <h1>
          <Logo />
        </h1>
      </header>
      <section
        className="relative w-full h-full flex items-center justify-center 
      p-8 max-w-xl col-span-1"
      >
        <Outlet />
      </section>
      <section className="hidden md:flex flex-1 items-center justify-center p-8 col-span-1">
        <img src="/auth/container.png" width={1000} height={1000} />
      </section>
    </div>
  )
}
