import { User } from "./users";

import { type PrismaClient } from "@prisma/client";

export interface Session {
  user?: User;
}

export interface ServerContext {
  session: Session | null;
  prisma: PrismaClient;
  // pubsub: PubSub;
}
