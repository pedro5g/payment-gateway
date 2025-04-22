import { useNavigate } from "react-router"
import { Button } from "./button"

export const Hero = () => {
  const navigate = useNavigate()
  return (
    <section className=" w-full grid grid-cols-2 mt-8 bg-white rounded-l-xl shadow overflow-hidden">
      <div className="relative col-span-1 row-span-1 w-full px-5 pt-32">
        <div className=" w-full flex flex-col gap-10">
          <div>
            <h1 className="font-bold text-5xl text-[#022F40] leading-15">
              Settle up Fast Easily Transfer Money To Other Users
            </h1>
          </div>
          <div>
            <p className="text-base text-[#022F40] font-medium">
              It’s easy to get paid back, Send money straight to globally,
              Manage your money, anytime, anywhere. Take control of your money
              effortlessly and securely. Get faster access to your payments, pay
              contactless in-store and more.
            </p>
          </div>
          <div>
            <div className="w-full flex items-center gap-10">
              <div className="w-full drop-shadow-2xl shadow-zinc-900">
                <Button onClick={() => navigate("/sign-up")}>
                  Create Account
                </Button>
              </div>
              <div className="w-full drop-shadow-2xl shadow-zinc-900">
                <Button onClick={() => navigate("/sign-in")} variant="outline">
                  Enter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute leading-0 -translate-y-1/2 top-1/2 h-full
        border-t-[800px] border-b-[800px] border-t-transparent border-b-transparent 
        border-l-[90px] border-l-white"
        />
        <img
          src="/leading/Hero Image.png"
          width={550}
          height={650}
          className="w-full"
        />
      </div>
    </section>
  )
}
