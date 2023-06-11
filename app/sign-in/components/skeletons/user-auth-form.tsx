import React from 'react'

import { Spinner } from '@/components/icons'

export function UserAuthFormSkeleton() {
  return (
    <div className="flex h-60 items-center justify-center">
      <Spinner className="h-12 w-12 text-muted" />
    </div>
  )
}
