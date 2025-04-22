import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./app.tsx"
import { QueyProvider } from "./context/query-provider.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueyProvider>
      <App />
    </QueyProvider>
  </StrictMode>,
)
