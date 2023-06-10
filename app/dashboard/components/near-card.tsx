'use client'

import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { parseNear } from '@/lib/chain'

import { useAccountBalance, useWalletSelector } from '../hooks/use-near-wallet'
import { NearConnectButton } from './near-connect-button'
import { NearDisconnectButton } from './near-disconnect-button'

export function NearCard() {
  const { accountId } = useWalletSelector()
  const { balance } = useAccountBalance()
  const balanceString = React.useMemo(() => {
    return Number.parseFloat(parseNear(balance)).toFixed(4)
  }, [balance])

  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:gap-12">
      <Card>
        <CardHeader>
          <CardTitle>Near Wallet</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {accountId ? (
            <React.Fragment>
              <div className="flex flex-col">
                <p className="leading-7 [&:not(:first-child)]:mt-2">
                  Your account is {accountId}
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-2">
                  Your balance is {balanceString} NEAR
                </p>
              </div>
              <NearDisconnectButton />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <blockquote className="mt-6 border-l-2 pl-6 italic">
                Please connect your wallet
              </blockquote>
              <NearConnectButton />
            </React.Fragment>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default NearCard
