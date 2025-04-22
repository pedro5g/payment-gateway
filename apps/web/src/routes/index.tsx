import { BrowserRouter, Route, Routes } from "react-router"
import { BaseLayout } from "../layouts/base-layout"
import {
  authenticationRoutes,
  protectedRoutes,
  publicRoutes,
} from "./common/routes"
import { NotFound } from "../pages/not-found"
import { AppLayout } from "../layouts/app-layout"
import { LeadingLayout } from "../layouts/leading-layout"

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LeadingLayout />}>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route path="/" element={<></>}>
          <Route element={<BaseLayout />}>
            {authenticationRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>

        <Route path="/" element={<></>}>
          <Route element={<AppLayout />}>
            {protectedRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
