import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'

export interface SkeletonProperties
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

function Skeleton({ className, asChild, ...properties }: SkeletonProperties) {
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...properties}
    />
  )
}

export { Skeleton }
