import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./app.tsx"
import { QueyProvider } from "./context/query-provider.tsx"
import "./index.css"
import { HelmetProvider } from "react-helmet-async"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <QueyProvider>
        <App />
      </QueyProvider>
    </HelmetProvider>
  </StrictMode>,
)
