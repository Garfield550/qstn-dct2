import React from 'react'

import { Button } from '@/components/ui/button'

import { useWalletSelector } from '../../hooks/use-near-wallet'

export function NearDisconnectButton() {
  const { accountId, disconnect } = useWalletSelector()

  const handleDisconnect = React.useCallback(async () => {
    await disconnect()
  }, [disconnect])

  return (
    <Button onClick={handleDisconnect}>
      Disconnect{accountId ? ` ${accountId}` : ''}
    </Button>
  )
}
