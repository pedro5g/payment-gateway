interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "base" | "outline"
}

export const Button = ({
  children,
  variant = "base",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      data-style={variant}
      className="inline-flex items-center justify-center w-full p-2.5 
       text-xs md:text-base font-bold text-white data-[style='base']:bg-[#022F40] 
      data-[style='outline']:text-[#022F40] data-[style='outline']:bg-white
      data-[style='outline']:border-2 data-[style='outline']:border-[#022F40] rounded-md
      cursor-pointer
      "
    >
      {children}
    </button>
  )
}
