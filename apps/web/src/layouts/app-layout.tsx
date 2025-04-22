import { Outlet } from "react-router"

export function AppLayout() {
  return (
    <div className="flex flex-col w-full h-auto">
      <Outlet />
    </div>
  )
}
