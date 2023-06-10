import React from 'react'

import { EthereumGQLIntegrationCard } from './ethereum-cards/ethereum-gql-integration-card'
import { EthereumWalletIntegrationCard } from './ethereum-cards/ethereum-wallet-integration-card'

export function EthereumCard() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:gap-12">
      <EthereumWalletIntegrationCard />
      <EthereumGQLIntegrationCard />
    </div>
  )
}
