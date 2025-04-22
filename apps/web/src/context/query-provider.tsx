import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

export const QueyProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
              if (failureCount < 2 && error?.message === "Network Error") {
                return true
              }
              return false
            },
            retryDelay: 0,
          },
        },
      }),
  )

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
