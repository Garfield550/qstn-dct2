import { type NextAuthOptions, type User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const user: User = {
  id: '33b1b195-f33b-46a9-b5d8-1a91f13af220',
  name: 'John Doe',
  email: 'johndoe@example.com',
  image: 'https://i.pravatar.cc/150',
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          credentials?.username === 'johndoe' &&
          credentials?.password === 'abcd1234'
        ) {
          return user
        }
        // eslint-disable-next-line unicorn/no-null
        return null
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session = {
          ...session,
          user: {
            name: token.name,
            email: token.email,
            image: token.picture,
          },
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user?.id
      }
      return token
    },
  },
}
