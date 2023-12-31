import { z, type ZodFormattedError } from 'zod'

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url().optional(),
})

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  NEXT_PUBLIC_INFURA_API_KEY: z.string().nonempty(),
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: z.string().nonempty(),
  NEXT_PUBLIC_CHAIN_NETWORK: z.enum(['mainnet', 'testnet']).default('testnet'),
  NEXT_PUBLIC_NFT_CONTRACT_ADDRESS: z.string().nonempty(),
  NEXT_PUBLIC_AURORA_EXPLORER_GQL_URL: z.string().url(),
  NEXT_PUBLIC_NEAR_CONTRACT_ID: z.string().nonempty(),
})

export const formatErrors = (
  errors: ZodFormattedError<Map<string, string>, string>
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && '_errors' in value) {
        return `${name}: ${value._errors.join(', ')}\n`
      }
      return
    })
    .filter(Boolean)
