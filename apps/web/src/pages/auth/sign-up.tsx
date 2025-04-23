import { Input } from "../../components/auth/input"
import { Button } from "../../components/auth/button"
import { Link } from "react-router"

export function SignUp() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-5">
      <main className="w-full flex flex-col items-center justify-center ">
        <div className="space-y-8">
          <div>
            <h3 className="font-bold text-[2.5rem] text-zinc-800">Sign up</h3>
            <span className="text-base text-zinc-500">
              Sign up to enjoy the features of Gateway
            </span>
          </div>
          <form>
            <div className="space-y-5">
              <Input label="You Name" />
              <Input label="Email" type="email" />
              <Button>Sign up</Button>
            </div>
          </form>
        </div>
      </main>

      <span className="text-base text-zinc-500 font-light">
        Already have an account??{" "}
        <Link
          className="text-blue-500 font-semibold hover:underline"
          to={"/sign-in"}
        >
          Sign in
        </Link>
      </span>
    </div>
  )
}
