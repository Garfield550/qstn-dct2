import Link from 'next/link'
import React from 'react'

import { Logo } from '@/components/icons'
import { siteConfig } from '@/config/site'
import { type NavItem } from '@/types/nav'

import { MainNavItem } from './main-nav-item'

interface MainNavProperties {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProperties) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Logo className="h-6 w-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length && (
        <nav className="flex gap-6">
          {items?.map((item, index) => (
            <MainNavItem item={item} key={index} />
          ))}
        </nav>
      )}
    </div>
  )
}
