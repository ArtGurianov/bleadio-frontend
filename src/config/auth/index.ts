import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import db from "@/config/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const LOGGED_IN_QUERY_KEY = "loggedIn";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Resend({
      from: "noreply@blead.io",
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    verifyRequest: "/",
  },
});
