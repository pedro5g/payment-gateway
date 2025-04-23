interface ButtonProps extends React.ComponentProps<"button"> {}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="inline-flex px-2 py-4 bg-blue-500 text-white 
      text-base  font-normal leading-4 cursor-pointer w-full rounded-xl items-center justify-center"
    >
      {children}
    </button>
  )
}
