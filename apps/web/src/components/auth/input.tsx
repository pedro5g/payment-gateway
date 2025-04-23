interface InputProps extends React.ComponentProps<"input"> {
  label: string
}

export const Input = ({ label, type = "text", ...props }: InputProps) => {
  return (
    <div className="relative">
      <input
        {...props}
        type={type}
        id={`floating_outlined_${label}`}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-zinc-900 bg-transparent 
        rounded-lg border-2 border-zinc-500/40  appearance-none 
         focus:outline-none focus:ring-0 focus:border-blue-400 peer"
        placeholder=" "
      />
      <label
        htmlFor={`floating_outlined_${label}`}
        className="absolute text-sm text-zinc-500 duration-300 transform 
        -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 
        peer-focus:px-2 peer-focus:text-blue-400 
        peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
        peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 
        rtl:peer-focus:translate-x-2/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
    </div>
  )
}
