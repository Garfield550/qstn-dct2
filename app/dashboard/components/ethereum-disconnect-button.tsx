'use client'

import React from 'react'
import { useAccount, useDisconnect } from 'wagmi'

import { Button } from '@/components/ui/button'

import { useTruncatedEthAddress } from '../hooks/use-truncated-eth-address'

export function EthereumDisconnectButton() {
  const { address, isConnected } = useAccount()
  const { disconnectAsync } = useDisconnect()

  const account = useTruncatedEthAddress(address)

  const handleDisconnect = React.useCallback(async () => {
    if (!isConnected) return
    await disconnectAsync()
  }, [disconnectAsync, isConnected])

  return (
    <Button onClick={handleDisconnect}>
      Disconnect{account ? ` ${account}` : ''}
    </Button>
  )
}
