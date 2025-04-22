import { Check } from "lucide-react"

const topics = [
  "Card",
  "Bank Transfer",
  "Point of Sales (POS)",
  "Account Number",
  "Mobile Money",
  "USSD",
  "VISA QR",
]

export const Features = () => {
  return (
    <section className="mt-8">
      <div className="w-full flex flex-col mb-5">
        <h3 className="text-[42px]  text-[#022F40] font-bold">Features</h3>
        <div className="w-full inline-flex">
          <p className="text-base font-medium text-[#022F40] w-[811px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="col-span-1 w-full">
          <ul className="flex flex-col justify-between items-start h-full">
            {topics.map((topic, i) => (
              <li
                key={`${topic}_${i}`}
                className="relative inline-flex items-center space-x-5
                before:absolute before:bg-[#022F40] before:opacity-15 before:left-0 before:bottom-0 
                before:h-full before:w-12 before:rounded-lg"
              >
                <Check
                  className="text-[#022F40] absolute z-10 left-0"
                  size={32}
                />
                <div className="size-4" />
                <span className="text-black text-base font-semibold">
                  {topic}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative col-span-1 pr-10">
          <img
            className="absolute z-10 top-0 -translate-y-1/3 right-0 "
            src="/leading/Upper Image.png"
            alt="Upper Image"
            width={290}
            height={260}
          />
          <img
            src="/leading/Lower Image.png"
            alt="Lower Image"
            width={600}
            height={440}
          />
        </div>
      </div>
    </section>
  )
}
