import React from 'react'

import { truncateEthAddress } from '@/lib/chain'

export function useTruncatedEthAddress(address?: string) {
  const truncatedAddress = React.useMemo(() => {
    return truncateEthAddress(address)
  }, [address])

  return truncatedAddress
}
