'use client'

/* eslint-disable unicorn/no-null */

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'
import { type NavItem } from '@/types/nav'

interface MainNavItemProperties {
  item: NavItem
}

export function MainNavItem({ item }: MainNavItemProperties) {
  const segment = useSelectedLayoutSegment()

  return (
    <React.Fragment>
      {item.href ? (
        <Link
          href={item.href}
          className={cn(
            'flex items-center text-sm font-medium transition-colors hover:text-foreground/80',
            item.href.startsWith(`/${segment}`)
              ? 'text-foreground'
              : 'text-foreground/60',
            item.disabled && 'cursor-not-allowed opacity-80'
          )}
        >
          {item.title}
        </Link>
      ) : null}
    </React.Fragment>
  )
}
