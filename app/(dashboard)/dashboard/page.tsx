import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'

export const metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/sign-in')
  }

  return <div>dashboard {user.name}</div>
}
