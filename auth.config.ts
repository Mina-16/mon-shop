import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async () => null, // ← فارغ دائماً هنا
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        (session.user as any).role = (user as any).role ?? "USER";
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
  // ← لا session strategy هنا
};