import client from "../../client";
import { Resolver } from "../../types";

const resolverFn: Resolver = async (_, { userName, endCursor }) => {
  const ok = await client.user.findUnique({
    where: {
      userName
    },
    select: {
      id: true
    }
  });
  if (!ok) {
    return {
      ok: false,
      error: "User not found"
    };
  }
  const following = await client.user
    .findUnique({
      where: {
        userName
      }
    })
    .following({
      take: 5,
      skip: endCursor ? 1 : 0,
      ...(endCursor && { cursor: { id: endCursor } })
    });
  return {
    ok: true,
    following
  };
};

export default {
  Query: {
    seeFollowing: resolverFn
  }
};
