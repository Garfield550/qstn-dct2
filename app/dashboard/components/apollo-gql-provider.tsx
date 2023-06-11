'use client'

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  SuspenseCache,
} from '@apollo/client'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'
import React from 'react'

import { isDevelopment } from '@/env'

if (isDevelopment) {
  // Adds messages only in a dev environment
  loadDevMessages()
  loadErrorMessages()
}

/**
 * Create a client
 * @param uri - The GraphQL endpoint to use, this needs to be an absolute url,
 * as relative urls cannot be used in SSR
 */
function makeClient(uri: string) {
  const httpLink = new HttpLink({
    uri,
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { cache: 'no-store' },
  })

  return new ApolloClient({
    // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            // in a SSR environment, if you use multipart features like
            // @defer, you need to decide how to handle these.
            // This strips all interfaces with a `@defer` directive from your queries.
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  })
}

function makeSuspenseCache() {
  return new SuspenseCache()
}

type GraphQLProvider = {
  endpoint: string
  children: React.ReactNode
}

export function ApolloGraphQLProvider({ endpoint, children }: GraphQLProvider) {
  const handleMakeClient = React.useCallback(
    () => makeClient(endpoint),
    [endpoint]
  )

  return (
    <ApolloNextAppProvider
      makeClient={handleMakeClient}
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  )
}
