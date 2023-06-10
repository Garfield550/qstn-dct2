'use client'

import { ConnectKitButton } from 'connectkit'

import { Button } from '@/components/ui/button'

export function EthereumConnectButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <Button onClick={show}>
            {isConnected ? ensName ?? truncatedAddress : 'Connect Wallet'}
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}
