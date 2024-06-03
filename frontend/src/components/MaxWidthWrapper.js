import { cn } from "@/lib/utils"

const MaxWidthWrapper = ({className,children}) => {
  return (
    <div
      className={cn(
        "h-full mx-auto w-full max-w-screen-xl md:px-20 justify-center items-center flex flex-col",
        className
      )}
    >
      {children}
    </div>
  )
}

export default MaxWidthWrapper