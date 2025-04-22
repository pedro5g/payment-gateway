import { ArrowRight } from "lucide-react"

export const HowWeWork = () => {
  return (
    <section className="mt-8">
      <div className="w-full flex flex-col items-start justify-between">
        <h1 className="text-[42px] font-bold text-[#0090C1]">How we work</h1>
        <div className="mt-10">
          <p className="text-base font-medium text-[#022F40]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="mt-4 grid grid-cols-2 w-full">
          <div className="col-span-1">
            <img
              src="/leading/Image.png"
              alt="image"
              width={550}
              height={650}
            />
          </div>
          <div className="col-span-1 px-4">
            <ul className="flex flex-col justify-between w-full h-full">
              <li className="space-x-10 inline-flex">
                <div>
                  <div className="size-[50px] rounded-full inline-flex items-center justify-center bg-[#022F40] text-white">
                    <ArrowRight size={36} />
                  </div>
                </div>
                <div className="space-y-5">
                  <h3 className="text-[#0090C1] text-2xl font-semibold">
                    Easy to use
                  </h3>
                  <p className="font-medium text-base text-[#022F40]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </li>
              <li className="space-x-10 inline-flex">
                <div>
                  <div className="size-[50px] rounded-full inline-flex items-center justify-center bg-[#022F40] text-white">
                    <ArrowRight size={36} />
                  </div>
                </div>
                <div className="space-y-5">
                  <h3 className="text-[#0090C1] text-2xl font-semibold">
                    Send Money
                  </h3>
                  <p className="font-medium text-base text-[#022F40]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </li>
              <li className="space-x-10 inline-flex">
                <div>
                  <div className="size-[50px] rounded-full inline-flex items-center justify-center bg-[#022F40] text-white">
                    <ArrowRight size={36} />
                  </div>
                </div>
                <div className="space-y-5">
                  <h3 className="text-[#0090C1] text-2xl font-semibold">
                    Recieve Money
                  </h3>
                  <p className="font-medium text-base text-[#022F40]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </li>
              <li className="space-x-10 inline-flex">
                <div>
                  <div className="size-[50px] rounded-full inline-flex items-center justify-center bg-[#022F40] text-white">
                    <ArrowRight size={36} />
                  </div>
                </div>
                <div className="space-y-5">
                  <h3 className="text-[#0090C1] text-2xl font-semibold">
                    Withdraw Money
                  </h3>
                  <p className="font-medium text-base text-[#022F40]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
