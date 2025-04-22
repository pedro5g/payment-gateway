export const PUBLIC_ROUTES = {
  LANDING_PAGE: "/",
}

export const AUTH_ROUTES = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
}

export const PROTECTED_ROUTES = {
  MAIN_PAINEL: "/main",
}

export const isAuthRoute = (pathname: string): boolean => {
  return Object.values(AUTH_ROUTES).includes(pathname)
}
