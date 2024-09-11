import { userResolvers } from "./users";
import merge from "lodash.merge";

export const resolvers = merge({}, userResolvers);
