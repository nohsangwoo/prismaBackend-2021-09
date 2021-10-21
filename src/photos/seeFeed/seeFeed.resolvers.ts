import client from "../../client";
import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolverFn: Resolver = async (_, { endCursor }, { loggedInUser }) => {
  if (!loggedInUser) {
    return { ok: false, error: "you need to login" };
  }

  const result = await client.photo.findMany({
    where: {
      OR: [
        {
          user: {
            following: {
              some: {
                id: loggedInUser.id
              }
            }
          }
        },
        {
          userId: loggedInUser.id
        }
      ]
    },
    take: 5,
    skip: endCursor ? 1 : 0,
    ...(endCursor && { cursor: { id: endCursor } }),
    orderBy: {
      createdAt: "desc"
    }
  });

  return result;
};

export default {
  Query: {
    seeFeed: protectedResolver(resolverFn)
  }
};
