import client from "../../client";
import { Resolver } from "../../types";

const resolverFn: Resolver = async (_, { keyword, endCursor }) => {
  const result = await client.user.findMany({
    where: {
      userName: {
        startsWith: keyword.toLowerCase()
      }
    },
    include: {
      followers: true,
      following: true
    },
    take: 5,
    skip: endCursor ? 1 : 0,
    ...(endCursor && { cursor: { id: endCursor } })
  });

  return result;
};

export default {
  Query: {
    searchUsers: resolverFn
  }
};
