'use client'

import React from 'react'
import { useAccount, useBalance } from 'wagmi'

import { InfoLine } from '../info-line'
import { EthereumConnectButton } from './ethereum-connect-button'
import { EthereumDisconnectButton } from './ethereum-disconnect-button'

export function EthereumWalletAddressInfo() {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address, watch: true })
  const balanceString = React.useMemo(() => {
    return Number.parseFloat(balance?.formatted || '0').toFixed(4)
  }, [balance])

  return (
    <React.Fragment>
      {address ? (
        <React.Fragment>
          <div className="flex flex-col">
            <InfoLine title="Address:">{address}</InfoLine>
            <InfoLine title="Balance:">{balanceString} ETH</InfoLine>
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
    </React.Fragment>
  )
}

export default EthereumWalletAddressInfo
