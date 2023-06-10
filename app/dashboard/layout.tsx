import '@near-wallet-selector/modal-ui/styles.css'

import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/lib/session'

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
    <div className="flex min-h-screen flex-col space-y-6">
      <div className="container flex-1">
        <div className="my-6 flex flex-col gap-6 md:gap-8 lg:grid lg:grid-cols-2 lg:gap-12">
          {children}
        </div>
      </div>
    </div>
  )
}
