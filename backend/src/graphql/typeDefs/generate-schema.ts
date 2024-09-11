import { printSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import path from "path";
import { writeFileSync } from "fs";

// Load all .graphql files from the specified directory
const typesArray = loadFilesSync(
  path.join(process.cwd(), "src/graphql/typeDefs/"),
  {
    extensions: ["graphql"],
  }
);

// Merge all type definitions into a single schema
export const mergedTypeDefs = mergeTypeDefs(typesArray);

// Create an executable schema
export const typeDefsSchema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
});

// Convert the combined typeDefs to GraphQLSchema
const combinedSchema = printSchema(typeDefsSchema);

// Write the combined schema to a new file
writeFileSync(
  path.join("src/graphql/typeDefs", "schema.graphql"),
  combinedSchema
);
