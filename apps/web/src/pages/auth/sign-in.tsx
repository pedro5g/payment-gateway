import { Input } from "../../components/auth/input"
import { Button } from "../../components/auth/button"
import { Link } from "react-router"

export function SignIn() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-5">
      <main className="w-full flex flex-col items-center justify-center ">
        <div className="space-y-8">
          <div>
            <h3 className="font-bold text-[2.5rem] text-zinc-800">Sign in</h3>
            <span className="text-base text-zinc-500">
              Please login to continue to your account.
            </span>
          </div>
          <form>
            <div className="space-y-5">
              <Input label="Email" type="email" />
              <Button>Sign in</Button>
            </div>
          </form>
        </div>
      </main>

      <span className="text-base text-zinc-500 font-light">
        Need an account?{" "}
        <Link
          className="text-blue-500 font-semibold hover:underline"
          to={"/sign-up"}
        >
          Create one
        </Link>
      </span>
    </div>
  )
}
