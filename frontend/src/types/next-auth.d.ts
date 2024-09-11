/**
 * For more info on module augmentation and expanding upon what
 * gets returned by auth, useSession, getSession and so on:
 * https://authjs.dev/getting-started/typescript
 */

import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extend the User type to include properties that the backend needs
   * from each session request, such as <id> and <username>.
   */
  interface User {
    id?: string;
    username?: string;
  }

  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    /**
     * To keep the default session user properties,
     * you need to add them back into the newly declared interface.
     */
    user: User & DefaultSession["user"];
  }
}
