import NextAuth, { type User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user: User = {
          id: '33b1b195-f33b-46a9-b5d8-1a91f13af220',
          name: 'J Smith',
          email: 'jsmith@example.com',
        }
        if (
          credentials?.username === 'jsmith' &&
          credentials?.password === 'abcd1234'
        ) {
          return user
        }
        // eslint-disable-next-line unicorn/no-null
        return null
      },
    }),
  ],
})

export { handler as GET, handler as POST }
