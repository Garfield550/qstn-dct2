'use client'

import { aurora, auroraTestnet } from '@wagmi/chains'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { useTheme } from 'next-themes'
import React from 'react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import { isDevelopment } from '@/env'
import {
  getInfuraApiKey,
  getNetworkType,
  getWalletConnectProjectId,
} from '@/lib/chain'

const infuraKey = getInfuraApiKey()
const walletConnectProjectId = getWalletConnectProjectId()

const network = getNetworkType()
const chain = network === 'mainnet' ? aurora : auroraTestnet
const initialChainId = chain.id

const { chains, publicClient } = configureChains(
  [chain],
  [infuraProvider({ apiKey: infuraKey }), publicProvider()],
  { pollingInterval: 10_000 }
)

const config = createConfig(
  getDefaultConfig({
    appName: 'QSTN DCT2',
    chains,
    publicClient,
    walletConnectProjectId,
  })
)

type WalletProvider = { children: React.ReactNode }

export function EthereumWalletProvider({ children }: WalletProvider) {
  const { theme } = useTheme()
  const mode = React.useMemo(
    () => (theme === 'dark' ? 'dark' : 'light'),
    [theme]
  )

  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        theme="midnight"
        mode={mode}
        options={{ initialChainId }}
        debugMode={isDevelopment}
      >
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
