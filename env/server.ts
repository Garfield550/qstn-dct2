import { formatErrors, serverSchema } from './schema'

const serverEnvironment = serverSchema.safeParse(process.env)

if (!serverEnvironment.success) {
  console.error(
    'Invalid environment variables:\n',
    ...formatErrors(serverEnvironment.error.format())
  )
  throw new Error('Invalid environment variables')
}

for (const key of Object.keys(serverEnvironment.data)) {
  if (key.startsWith('NEXT_PUBLIC_')) {
    console.error('You are exposing a server-side env-variable:', key)

    throw new Error('You are exposing a server-side env-variable')
  }
}

export const environment = serverEnvironment.data
