import { environment } from '@/env/client'

export function getInfuraApiKey(): string {
  const apiKey = environment.NEXT_PUBLIC_INFURA_API_KEY
  return apiKey
}

export function getWalletConnectProjectId(): string {
  return environment.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
}

const truncateRegex = /^(0x[\dA-Za-z]{4})[\dA-Za-z]+([\dA-Za-z]{4})$/

export function truncateEthAddress(address?: string, separator = '••••') {
  if (!address) return ''
  const match = address.match(truncateRegex)
  if (!match) return address
  return `${match[1]}${separator}${match[2]}`
}
