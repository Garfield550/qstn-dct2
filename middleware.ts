/* eslint-disable unicorn/no-null */
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  async function middleware(request) {
    const token = await getToken({ req: request })
    const isAuth = !!token
    const isAuthPage = request.nextUrl.pathname.startsWith('/sign-in')

    // When user visit auth pages, we should check if user is already signed in.
    if (isAuthPage) {
      if (isAuth) {
        // Redirect to dashboard if user is already signed in.
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }

      return null
    }

    if (isAuth) return null

    // Generate a redirect URL then user can be
    // redirected back to the current page after sign in.
    let from = request.nextUrl.pathname
    if (request.nextUrl.search) {
      // Search params are encoded in the URL.
      from += request.nextUrl.search
    }

    return NextResponse.redirect(
      new URL(`/sign-in?from=${encodeURIComponent(from)}`, request.url)
    )
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in'],
}
