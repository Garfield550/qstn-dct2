import React from 'react'

import { Button } from '@/components/ui/button'

import { useWalletSelector } from '../../hooks/use-near-wallet'

export function NearConnectButton() {
  const { connect } = useWalletSelector()

  const handleShowModal = React.useCallback(() => {
    connect()
  }, [connect])

  return <Button onClick={handleShowModal}>Connect Wallet</Button>
}
