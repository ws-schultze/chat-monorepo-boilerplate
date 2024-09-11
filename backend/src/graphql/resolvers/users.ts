import { Resolvers } from "./__generated__/resolver-types";

import { User, CreateUsernameResponse } from "../../types/users";
import { ServerContext } from "../../types/server";
import { verifyAndCreateUsername } from "../../util/functions";

export const userResolvers: Resolvers = {
  Query: {
    searchUsers: async (): Promise<User[]> => {
      return [];
    },
    users: async (_parent, _args, context): Promise<User[]> => {
      const { prisma } = context;
      const users = prisma.user.findMany();
      // console.log("USERS: ", users);
      return users;
    },
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: ServerContext
    ): Promise<CreateUsernameResponse> => {
      // console.log("CREATING USERNAME: ", args.username);
      const { session, prisma } = context;

      if (!session?.user) {
        return {
          error: "Not authorized",
        };
      }

      const { id } = session.user;
      const { username } = args;

      return await verifyAndCreateUsername({ userId: id, username }, prisma);
    },
  },
};
