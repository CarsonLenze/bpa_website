import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth"

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  //do this to get the full user object and not the parsed one
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        //check authentication here
        if (credentials.email == 'test') throw new Error(JSON.stringify({ error: `No account found for ${credentials.email}` }));
        if (credentials.password == 'test') throw new Error(JSON.stringify({ error: 'invalid password' }));

        const user = { id: 1, email: credentials.email, password: credentials.password, frombackend: true, name: 'carsonlenze', image: 'https://avatars.githubusercontent.com/u/69915590?s=40&v=4' }

        if (user) return user
        return null
      }
    })
  ],
}

export default NextAuth(authOptions)