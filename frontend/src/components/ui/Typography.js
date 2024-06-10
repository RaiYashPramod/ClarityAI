import { cn } from "@/lib/utils"

export function TypographyH1({className, children}) {
  return (
    <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
      {children}
    </h1>
  )
}


export function TypographyLarge({className, children}) {
  return <div className={cn("text-xl md:text-2xl font-semibold", className)}>{children}</div>
}
export function TypographyLarge1({className, children}) {
  return <div className={cn("text-lg md:text-2xl font-semibold", className)}>{children}</div>
}