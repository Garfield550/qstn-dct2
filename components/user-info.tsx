import Link from 'next/link'
import React from 'react'

import { getCurrentUser } from '@/lib/session'

import { Button } from './ui/button'
import { UserNav } from './user-nav'

export async function UserInfo() {
  const user = await getCurrentUser()

  return (
    <React.Fragment>
      {user ? (
        <UserNav user={user} />
      ) : (
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </React.Fragment>
  )
}
