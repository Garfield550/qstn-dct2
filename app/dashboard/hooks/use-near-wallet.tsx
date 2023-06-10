'use client'

import { providers } from 'near-api-js'
import type { AccountView } from 'near-api-js/lib/providers/provider'
import React from 'react'

import { NearWalletSelectorContext } from '../components/near-wallet-provider'

export function useWalletSelector() {
  const context = React.useContext(NearWalletSelectorContext)

  const connect = React.useCallback(() => {
    if (!context) return
    const { modal } = context
    modal.show()
  }, [context])

  const switchWallet = React.useCallback(() => {
    if (!context) return
    const { modal } = context
    modal.show()
  }, [context])

  const disconnect = React.useCallback(async () => {
    if (!context) return
    const { selector } = context
    const wallet = await selector.wallet()
    await wallet.signOut()
  }, [context])

  return { ...context, connect, switchWallet, disconnect }
}

export function useProvider() {
  const { selector } = useWalletSelector()
  if (!selector) return
  const { network } = selector.options
  const provider = new providers.JsonRpcProvider({ url: network.nodeUrl })
  return provider
}

export type Account = AccountView & {
  account_id: string
}

type UseAccountOptions = {
  accountId?: string
}

export function useAccount({ accountId: wantAccountId }: UseAccountOptions) {
  const { accountId: connectedAccountId, selector } = useWalletSelector()
  const provider_ = useProvider()

  const [account, setAccount] = React.useState<Account>()

  const getAccount = React.useCallback(async () => {
    const accountId = wantAccountId ?? connectedAccountId
    if (!accountId || !provider_ || !selector) return

    try {
      const accountInfo = await provider_.query<AccountView>({
        request_type: 'view_account',
        finality: 'final',
        account_id: accountId,
      })

      const balance = BigInt(accountInfo.amount)
      if (!balance) {
        const wallet = await selector.wallet()
        await wallet.signOut()

        const error = new Error(
          `Account ID: ${wantAccountId} has not been founded. Please send some NEAR into this account.`
        )
        console.error('[useAccount] getAccount', error)
        return
      }

      // console.debug('[useAccount] getAccount::accountInfo', accountInfo)
      setAccount({ ...accountInfo, account_id: accountId })
    } catch (error) {
      console.error('[useAccount] getAccount', error)
    }
  }, [wantAccountId, connectedAccountId, provider_, selector])

  React.useEffect(() => {
    getAccount()
  }, [getAccount])

  return account
}

type UseSwitchAccountOptions = {
  accountId?: string
}

export function useSwitchAccount({
  accountId: wantAccountId,
}: UseSwitchAccountOptions) {
  const {
    accounts,
    accountId: connectedAccountId,
    selector,
  } = useWalletSelector()

  const switchAccount = React.useCallback(() => {
    if (!selector || !accounts) return

    if (wantAccountId) {
      selector.setActiveAccount(wantAccountId)
      console.debug(
        '[useSwitchAccount] switchAccount',
        connectedAccountId,
        wantAccountId
      )
      console.log(`Switched account to ${wantAccountId}`)
      return
    }

    if (!connectedAccountId || !(accounts.length > 1)) return

    const currentIndex = accounts.findIndex(
      (x) => x.accountId === connectedAccountId
    )
    const nextIndex = currentIndex < accounts.length - 1 ? currentIndex + 1 : 0
    const nextAccountId = accounts[nextIndex].accountId

    selector.setActiveAccount(nextAccountId)

    console.debug(
      '[useSwitchAccount] switchAccount',
      connectedAccountId,
      nextAccountId
    )
    console.log(`Switched account to ${nextAccountId}`)
  }, [accounts, connectedAccountId, selector, wantAccountId])

  return switchAccount
}

type UseAccountBalanceOptions = {
  accountId?: string
}

export function useAccountBalance(options?: UseAccountBalanceOptions) {
  const account = useAccount({ accountId: options?.accountId })

  const balance = React.useMemo<bigint>(() => {
    return account ? BigInt(account.amount) : BigInt(0)
  }, [account])
  const hasBalance = React.useMemo<boolean>(() => {
    return !!balance
  }, [balance])

  return { hasBalance, balance }
}
