/**
 * For more information:
 * https://authjs.dev/guides/edge-compatibility#split-config
 */

import Google from "@auth/express/providers/google";
import GitHub from "@auth/express/providers/github";
import type { ExpressAuthConfig } from "@auth/express";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
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
      console.log("SERVER SESSION CALLBACK: ", sessionUser);
      return {
        ...session,
        user: sessionUser,
      };
    },
  },
} satisfies ExpressAuthConfig;
