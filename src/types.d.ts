import { GraphQLUpload } from "graphql-upload";
import { PrismaClient } from "@prisma/client";
import { User } from ".prisma/client";

export type Context = {
  loggedInUser?: User;
  client: PrismaClient;
};

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => any;

export type Resolvers = {
  [key: string]:
    | {
        [key: string]: Resolver;
      }
    | typeof GraphQLUpload;
};
