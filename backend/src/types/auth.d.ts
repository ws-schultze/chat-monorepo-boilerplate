/**
 * The Session type defined here must match the Session type in the frontend.
 * 1) Creating a username uses user.id to find the user to give the username to.
 * 2) Usernames must be unique.
 */

import "@auth/core/types";

declare module "@auth/core/types" {
  interface User {
    id?: string;
    username?: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}
