import { protectedResolver } from "./../users.utils";
import { Resolvers, Resolver } from "../../types";
import client from "../../client";

const resolverFn: Resolver = async (root, { userName }) => {
  try {
    return client.user.findUnique({
      where: {
        userName
      },
      include: {
        following: true,
        followers: true
      }
    });
  } catch (e) {
    return e;
  }
};

const resolvers: Resolvers = {
  Query: {
    seeProfile: protectedResolver(resolverFn)
  }
};

export default resolvers;
