/**
 * For server setup help:
 * https://www.apollographql.com/docs/apollo-server/integrations/mern
 */

import "dotenv/config";

import cors from "cors";
import express from "express";

import http from "http";

import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { resolvers } from "./graphql/resolvers/resolvers";
import { ServerContext, Session } from "@/types/index";

import { getSession } from "@auth/express";

import { PrismaClient } from "@prisma/client";

import { authConfig } from "./authentication/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";

async function main() {
  const PORT = process.env.PORT || 5050;

  // Create an Express application
  const app = express();

  // Create an HTTP server
  const httpServer = http.createServer(app);

  // Load GraphQL type definitions
  const typeDefs = loadFilesSync("src/graphql/typeDefs/schema.graphql");

  // Create the executable schema
  const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // Create an Apollo Server instance
  const server = new ApolloServer({
    schema: executableSchema,
    introspection: process.env.NODE_ENV !== "production",
    csrfPrevention: true,
    // Proper shutdown for the HTTP server.
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Start the Apollo Server
  await server.start();

  // Configure CORS options
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  // Initialize Prisma Client
  const prisma = new PrismaClient();

  // Apply CORS middleware to specific route
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(corsOptions),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<ServerContext> => {
        const session: Session | null = await getSession(req, {
          ...authConfig,
          adapter: PrismaAdapter(prisma),
        });
        return { session: session, prisma: prisma };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );

  console.log(`🚀 Server is now running on http://localhost:${PORT}/graphql`);
}

main().catch((err) => console.log("SERVER ERROR: ", err));
