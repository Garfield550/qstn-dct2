import dynamic from 'next/dynamic'
import React from 'react'

import { CardSkeleton } from './card-skeleton'
import { EthereumGQLIntegrationCard } from './ethereum-cards/ethereum-gql-integration-card'

const EthereumWalletIntegrationCard = dynamic(
  () => import('./ethereum-cards/ethereum-wallet-integration-card'),
  {
    loading: () => <CardSkeleton />,
    ssr: false,
  }
)

export function EthereumCard() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:gap-12">
      <EthereumWalletIntegrationCard />
      <EthereumGQLIntegrationCard />
    </div>
  )
}

export default EthereumCard
