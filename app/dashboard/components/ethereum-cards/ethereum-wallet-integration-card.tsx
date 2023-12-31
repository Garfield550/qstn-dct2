import dynamic from 'next/dynamic'
import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const EthereumWalletAddressInfo = dynamic(
  () => import('./ethereum-wallet-address-info'),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
)

export function EthereumWalletIntegrationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aurora Wallet</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <EthereumWalletAddressInfo />
      </CardContent>
    </Card>
  )
}
