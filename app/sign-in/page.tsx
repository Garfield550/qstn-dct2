import { type Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { Card, CardContent } from '@/components/ui/card'

import { UserAuthFormSkeleton } from './components/skeletons/user-auth-form'
import { UserAuthForm } from './components/user-auth-form'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign In to your account',
}

export default function SignInPage() {
  return (
    <div className="container flex flex-row items-center">
      <Card className="mx-auto my-6 md:my-20">
        <CardContent className="pt-6">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your username and password to continue
              </p>
            </div>
            <React.Suspense fallback={<UserAuthFormSkeleton />}>
              <UserAuthForm />
            </React.Suspense>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <p className="px-8 text-center text-sm text-muted-foreground">
              Does&apos;t have an account?{' '}
              <Link
                href="/sign-up"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
