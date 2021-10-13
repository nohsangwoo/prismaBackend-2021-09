import client from "../../client";
import { Resolver } from "../../types";
import { protectedResolver } from "../users.utils";

const resolverFn: Resolver = async (_, { userName }, { loggedInUser }) => {
  const ok = await client.user.findUnique({
    where: {
      userName
    }
  });
  if (!ok) {
    return {
      ok: false,
      error: "That user does not exist"
    };
  }
  if (!loggedInUser) {
    return {
      ok: false,
      error: "need to login"
    };
  }
  await client.user.update({
    where: {
      id: loggedInUser.id
    },
    data: {
      following: {
        disconnect: {
          userName
        }
      }
    }
  });
  return {
    ok: true
  };
};
export default {
  Mutation: {
    unfollowUser: protectedResolver(resolverFn)
  }
};
