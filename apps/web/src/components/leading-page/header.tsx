import { Link } from "react-router"
import { Button } from "./button"
import { Logo } from "../logo"

type LinkType = {
  name: string
  path: string
}

const LINKS: LinkType[] = [
  { name: "Feature", path: "#feature" },
  { name: "Wo We Works ", path: "#woWeWorks" },
  { name: "Contact Us", path: "#contactUs" },
]

export const Header = () => {
  return (
    <header className="flex justify-between items-center h-14 w-full">
      <div>
        <Logo />
      </div>
      <div className="flex items-center gap-5">
        <div>
          <Button>Home</Button>
        </div>
        <div className="flex items-center justify-between gap-2 md:gap-5">
          {LINKS.map((link) => (
            <Link
              className="text-xs md:text-base font-semibold text-[#022F40]"
              to={link.path}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div>
          <Button variant="outline">Create Account</Button>
        </div>
      </div>
    </header>
  )
}
