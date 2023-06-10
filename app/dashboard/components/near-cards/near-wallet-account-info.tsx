'use client'

import React from 'react'

import { parseNear } from '@/lib/chain'

import {
  useAccountBalance,
  useWalletSelector,
} from '../../hooks/use-near-wallet'
import { InfoLine } from '../info-line'
import { NearConnectButton } from './near-connect-button'
import { NearDisconnectButton } from './near-disconnect-button'

export function NearWalletAccountInfo() {
  const { accountId } = useWalletSelector()
  const { balance } = useAccountBalance()
  const balanceString = React.useMemo(() => {
    return Number.parseFloat(parseNear(balance)).toFixed(4)
  }, [balance])

  return (
    <React.Fragment>
      {accountId ? (
        <React.Fragment>
          <div className="flex min-w-0 flex-1 flex-col">
            <InfoLine title="Account:">{accountId}</InfoLine>
            <InfoLine title="Balance:">{balanceString} NEAR</InfoLine>
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
    </React.Fragment>
  )
}

export default NearWalletAccountInfo
