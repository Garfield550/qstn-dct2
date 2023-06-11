import { isAddress } from 'viem'

import { environment, type NetworkType } from '@/env/client'

export function getInfuraApiKey(): string {
  const apiKey = environment.NEXT_PUBLIC_INFURA_API_KEY
  return apiKey
}

export function getWalletConnectProjectId(): string {
  return environment.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
}

export function getNetworkType(): NetworkType {
  return environment.NEXT_PUBLIC_CHAIN_NETWORK
}

export function getNftContractAddress(): string {
  return environment.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
}

export function getNearContractId(): string {
  return environment.NEXT_PUBLIC_NEAR_CONTRACT_ID
}

const truncateRegex = /^(0x[\dA-Za-z]{4})[\dA-Za-z]+([\dA-Za-z]{4})$/

export function truncateEthAddress(address?: string, separator = '••••') {
  if (!address) return ''
  const isValid = isAddress(address)
  if (!isValid) return ''
  const match = address.match(truncateRegex)
  if (!match) return address
  return `${match[1]}${separator}${match[2]}`
}

const oneNear = '1_000_000_000_000_000_000_000_000'.replaceAll('_', '')
export const OneNear = BigInt(oneNear)

export function parseNear(value: bigint): string {
  const fraction = value % OneNear
  const integer = (value - fraction) / OneNear
  return `${integer}.${fraction.toString().padStart(24, '0')}`
}
