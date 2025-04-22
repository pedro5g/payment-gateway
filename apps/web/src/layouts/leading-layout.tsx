import { Outlet } from "react-router"

export function LeadingLayout() {
  return (
    <div className="w-full h-full flex flex-col items-center bg-[#E5E5E5]">
      <div className="w-full max-w-[1119px]">
        <Outlet />
      </div>
    </div>
  )
}
