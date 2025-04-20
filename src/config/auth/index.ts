import NextAuth, { DefaultSession } from "next-auth";
import Resend from "next-auth/providers/resend";
import db from "@/config/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

declare module "next-auth" {
  interface Session {
    user: {
      apiKey?: string;
    } & DefaultSession["user"];
  }

  interface User {
    apiKey?: string;
  }
}

export const LOGGED_IN_QUERY_KEY = "loggedIn";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Resend({
      from: "noreply@blead.io",
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.apiKey = user.apiKey;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    verifyRequest: "/",
  },
});
