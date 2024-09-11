/**
 * For more information:
 * https://authjs.dev/guides/edge-compatibility#split-config
 */

import NextAuth, { NextAuthConfig } from "next-auth";
import { authConfig } from "./auth.config";

const config: NextAuthConfig = {
  ...authConfig,
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
