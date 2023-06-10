'use client'

import React from 'react'
import { useAccount, useBalance } from 'wagmi'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { EthereumConnectButton } from './ethereum-connect-button'
import { EthereumDisconnectButton } from './ethereum-disconnect-button'

export function EthereumWalletIntegrationCard() {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address, watch: true })
  const balanceString = React.useMemo(() => {
    return Number.parseFloat(balance?.formatted || '0').toFixed(4)
  }, [balance])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aurora Wallet</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {address ? (
          <React.Fragment>
            <div className="flex flex-col">
              <p className="leading-7 [&:not(:first-child)]:mt-2">
                Your address is {address}
              </p>
              <p className="leading-7 [&:not(:first-child)]:mt-2">
                Your balance is {balanceString} ETH
              </p>
            </div>
            <EthereumDisconnectButton />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <blockquote className="mt-6 border-l-2 pl-6 italic">
              Please connect your wallet
            </blockquote>
            <EthereumConnectButton />
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  )
}

export default EthereumWalletIntegrationCard
