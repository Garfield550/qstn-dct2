import React from 'react'

import { NearWalletIntegrationCard } from './near-cards/near-wallet-integration-card'

export function NearCard() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:gap-12">
      <NearWalletIntegrationCard />
    </div>
  )
}
