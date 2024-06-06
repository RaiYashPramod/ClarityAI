import ChatForm from '@/components/ChatForm'
import DotPattern from '@/components/ui/dot-pattern'
import React from 'react'
import { cn } from '@/lib/utils'

const askGPT = () => {
  return (
    <>
      <ChatForm />
      <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className={cn(
              "-z-10 bg-gray-50"
            )}
          />
    </>
  )
}

export default askGPT