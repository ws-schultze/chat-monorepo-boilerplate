# Boilerplate Chat App

This is a boilerplate chat app built with Next.js, Auth.js, Prisma, GraphQL, Express and Apollo.

## Things to Know

Both the frontend and backend should be turned into their own repositories. This is a monorepo for the sake of simplicity.

## Getting Started

Populate the `.env` file with the appropriate values that can be found in the `.env.example` file.

Create a database in MongoDB Atlas, then populate the `DATABASE_URL` env variable with the connection string.

Generate the prisma schemas in both the front and backend via `npm prisma generate`

Note that prisma client is in the frontend because auth.js needs it for user authentication and creation.

There is plenty more to say, but I will leave it at that for now.

Have a good day.
