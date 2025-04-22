import { SignIn } from "../../pages/auth/sign-in"
import { SignUp } from "../../pages/auth/sign-up"
import { LeadingPage } from "../../pages/leading-page"
import { Main } from "../../pages/main/main"
import { AUTH_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES } from "./routes-path"

export type RoutesStruct = {
  path: string
  element: React.ReactElement
}

export const publicRoutes: RoutesStruct[] = [
  { path: PUBLIC_ROUTES.LANDING_PAGE, element: <LeadingPage /> },
]

export const authenticationRoutes: RoutesStruct[] = [
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
]

export const protectedRoutes: RoutesStruct[] = [
  { path: PROTECTED_ROUTES.MAIN_PAINEL, element: <Main /> },
]
