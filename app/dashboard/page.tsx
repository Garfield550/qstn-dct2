import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'
import React from 'react'

import { authOptions } from '@/lib/auth'
import { getNearContractId } from '@/lib/chain'
import { getCurrentUser } from '@/lib/session'

import { CardSkeleton } from './components/card-skeleton'
import { EthereumWalletProvider } from './components/connect-kit-provider'
import { NearWalletSelectorProvider } from './components/near-wallet-provider'

const EthereumCard = dynamic(() => import('./components/ethereum-card'), {
  loading: () => <CardSkeleton />,
  ssr: false,
})

const NearCard = dynamic(() => import('./components/near-card'), {
  loading: () => <CardSkeleton />,
  ssr: false,
})

const contractId = getNearContractId()

export const metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/sign-in')
  }

  return (
    <React.Fragment>
      <EthereumWalletProvider>
        <EthereumCard />
      </EthereumWalletProvider>
      <NearWalletSelectorProvider contractId={contractId}>
        <NearCard />
      </NearWalletSelectorProvider>
    </React.Fragment>
  )
}
