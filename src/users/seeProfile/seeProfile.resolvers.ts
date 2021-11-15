import { protectedResolver } from "./../users.utils";
import { Resolvers, Resolver } from "../../types";
import client from "../../client";

const resolverFn: Resolver = async (root, args) => {
  console.log("seeProfile bug?");
  const { userName } = args;

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
