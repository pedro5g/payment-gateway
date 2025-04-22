import { Features } from "../components/leading-page/features"
import { Header } from "../components/leading-page/header"
import { Hero } from "../components/leading-page/hero"
import { HowWeWork } from "../components/leading-page/how-we-work"

export function LeadingPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto">
      <Header />
      <Hero />
      <HowWeWork />
      <Features />
    </div>
  )
}
