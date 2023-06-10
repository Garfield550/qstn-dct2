import { redirect } from 'next/navigation'
import React from 'react'

import { authOptions } from '@/lib/auth'
import { getNearContractId } from '@/lib/chain'
import { getCurrentUser } from '@/lib/session'

import { EthereumWalletProvider } from './components/connect-kit-provider'
import { EthereumCard } from './components/ethereum-card'
import { NearCard } from './components/near-card'
import { NearWalletSelectorProvider } from './components/near-wallet-provider'

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
