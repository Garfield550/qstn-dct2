'use client'

import {
  type AccountState,
  setupWalletSelector,
  type WalletSelector,
} from '@near-wallet-selector/core'
import {
  setupModal,
  type WalletSelectorModal,
} from '@near-wallet-selector/modal-ui'
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet'
import { setupNearWallet } from '@near-wallet-selector/near-wallet'
import React from 'react'
import { distinctUntilChanged, map } from 'rxjs'

import { isDevelopment } from '@/env'

interface NearWalletSelectorContextValue {
  selector: WalletSelector
  modal: WalletSelectorModal
  accounts: Array<AccountState>
  accountId: string | undefined
}

export const NearWalletSelectorContext = React.createContext<
  NearWalletSelectorContextValue | undefined
>(undefined)

type WalletProvider = {
  contractId: string
  children: React.ReactNode
}

export function NearWalletSelectorProvider({
  contractId,
  children,
}: WalletProvider) {
  const [selector, setSelector] = React.useState<WalletSelector>()
  const [modal, setModal] = React.useState<WalletSelectorModal>()
  const [accounts, setAccounts] = React.useState<AccountState[]>([])

  const initialize = React.useCallback(async () => {
    const _selector = await setupWalletSelector({
      network: 'testnet',
      debug: isDevelopment,
      modules: [setupMyNearWallet(), setupNearWallet()],
    })

    const _modal = setupModal(_selector, { contractId })

    const state = _selector.store.getState()
    setAccounts(state.accounts)

    setSelector(_selector)
    setModal(_modal)
  }, [contractId])

  React.useEffect(() => {
    initialize().catch((error) => {
      console.error(error)
    })
  }, [initialize])

  React.useEffect(() => {
    if (!selector || !modal) return

    const subscription = selector.store.observable
      .pipe(
        map((state) => state.accounts),
        distinctUntilChanged()
      )
      .subscribe((nextAccounts) => {
        console.debug(
          '[NearWalletSelectorProvider] Accounts Update',
          nextAccounts
        )
        setAccounts(nextAccounts)
      })

    const onHideSubscription = modal.on('onHide', ({ hideReason }) => {
      console.debug('[NearWalletSelectorProvider] Hiding the modal', hideReason)
    })

    return () => {
      subscription.unsubscribe()
      onHideSubscription.remove()
    }
  }, [modal, selector])

  const walletSelectorContextValue = React.useMemo<
    NearWalletSelectorContextValue | undefined
  >(() => {
    if (!selector || !modal) return

    return {
      selector,
      modal,
      accounts,
      accountId:
        accounts.find((account) => account.active)?.accountId || undefined,
    }
  }, [selector, modal, accounts])

  return (
    <NearWalletSelectorContext.Provider value={walletSelectorContextValue}>
      {children}
    </NearWalletSelectorContext.Provider>
  )
}
