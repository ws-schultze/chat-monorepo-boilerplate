"use client";
// https://github.com/apollographql/apollo-client-nextjs

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

function makeClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

// you need to create a component to wrap your app in
export function ApolloProviderWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
