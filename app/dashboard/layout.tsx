import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/lib/session'

import { WalletProvider } from './components/connect-kit-provider'

interface DashboardLayoutProperties {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProperties) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <WalletProvider>
      <div className="flex min-h-screen flex-col space-y-6">
        <div className="container flex-1">{children}</div>
      </div>
    </WalletProvider>
  )
}
