import React from 'react'

import { MainNav } from '@/components/main-nav'
import { ThemeToggle } from '@/components/theme-toggle'
import { siteConfig } from '@/config/site'

import { UserInfoSkeleton } from './skeletons/user-info'
import { UserInfo } from './user-info'

export async function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <React.Suspense fallback={<UserInfoSkeleton />}>
              <UserInfo />
            </React.Suspense>
          </nav>
        </div>
      </div>
    </header>
  )
}
