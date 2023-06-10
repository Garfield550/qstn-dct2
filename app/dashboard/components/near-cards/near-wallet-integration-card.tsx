import dynamic from 'next/dynamic'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const NearWalletAccountInfo = dynamic(
  () => import('./near-wallet-account-info'),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
)

export function NearWalletIntegrationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Near Wallet</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <NearWalletAccountInfo />
      </CardContent>
    </Card>
  )
}
