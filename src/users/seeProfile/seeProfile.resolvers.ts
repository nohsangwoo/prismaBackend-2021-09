import { protectedResolver } from "./../users.utils";
import { Resolvers, Resolver } from "../../types";

const resolverFn: Resolver = async (_, { userName }, { client }) => {
  try {
    return client.user.findUnique({
      where: {
        userName
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
