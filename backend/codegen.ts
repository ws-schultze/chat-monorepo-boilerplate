/**
 * This is the config file used in package.json by "npm run codegen".
 *
 * For more info on this:
 * https://www.apollographql.com/docs/apollo-server/workflow/generate-types
 */

import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/graphql/typeDefs/schema.graphql",
  generates: {
    "src/graphql/resolvers/__generated__/resolver-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
      },
    },
  },
};

export default config;
