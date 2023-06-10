'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { userAuthSchema } from '@/lib/validations/auth'

type FormData = z.infer<typeof userAuthSchema>

type UserAuthFormProperties = React.HTMLAttributes<HTMLDivElement>

export function UserAuthForm({
  className,
  ...properties
}: UserAuthFormProperties) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const searchParameters = useSearchParams()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const onSubmit = React.useCallback(
    async (data: FormData) => {
      setIsLoading(true)

      const { username, password } = data
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
        callbackUrl: searchParameters?.get('from') || '/dashboard',
      })

      setIsLoading(false)

      console.debug('[UserAuthForm] onSubmit::result', result)
      if (!result?.ok) {
        toast({
          title: 'Something went wrong.',
          description: 'Your sign in request failed. Please try again.',
          variant: 'destructive',
        })
        return
      }

      if (result.url) {
        window.location.replace(result.url)
      }
    },
    [searchParameters]
  )

  return (
    <div className={cn('grid gap-6', className)} {...properties}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            {errors?.username && (
              <p className="px-1 text-xs text-red-600">
                {errors.username.message?.replace('String', 'Username')}
              </p>
            )}
            <Label className="sr-only" htmlFor="email">
              Username
            </Label>
            <Input
              id="username"
              placeholder="John Doe"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              {...register('username', { required: true })}
            />
          </div>
          <div className="grid gap-1">
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message?.replace('String', 'Password')}
              </p>
            )}
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              {...register('password', { required: true })}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{' '}
        Github
      </Button>
    </div>
  )
}
