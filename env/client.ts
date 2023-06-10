import { z } from 'zod'

import { clientSchema, formatErrors } from './schema'

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 */
const _clientEnvironment: {
  [k in keyof z.infer<typeof clientSchema>]:
    | z.infer<typeof clientSchema>[k]
    | undefined
} = {
  NEXT_PUBLIC_INFURA_API_KEY: process.env.NEXT_PUBLIC_INFURA_API_KEY,
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  NEXT_PUBLIC_NEAR_CONTRACT_ID: process.env.NEXT_PUBLIC_NEAR_CONTRACT_ID,
}

const clientEnvironment = clientSchema.safeParse(_clientEnvironment)

if (!clientEnvironment.success) {
  console.error(
    'Invalid environment variables:\n',
    ...formatErrors(clientEnvironment.error.format())
  )
  throw new Error('Invalid environment variables')
}

for (const key of Object.keys(clientEnvironment.data)) {
  if (!key.startsWith('NEXT_PUBLIC_')) {
    console.error(
      `Invalid public environment variable name: ${key}. It must begin with 'NEXT_PUBLIC_'`
    )

    throw new Error('Invalid public environment variable name')
  }
}

export const environment = clientEnvironment.data
