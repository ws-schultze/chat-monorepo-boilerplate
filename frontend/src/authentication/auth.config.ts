/**
 * For more information:
 * https://authjs.dev/guides/edge-compatibility#split-config
 */

import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/prisma";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      const sessionUser = { ...session.user, ...user };
      console.log("CLIENT SESSION CALLBACK: ", sessionUser);
      return {
        ...session,
        user: sessionUser,
      };
    },
  },
} satisfies NextAuthConfig;
