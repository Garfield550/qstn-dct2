import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'
import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'

import { CardSkeleton } from './components/card-skeleton'

const EthereumCard = dynamic(() => import('./components/ethereum-card'), {
  loading: () => <CardSkeleton />,
  ssr: false,
})

export const metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/sign-in')
  }

  return (
    <div className="my-6 flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-8 lg:gap-12">
      <EthereumCard />
      <Card>
        <CardHeader>
          <CardTitle>Near Wallet</CardTitle>
          <CardContent></CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}
