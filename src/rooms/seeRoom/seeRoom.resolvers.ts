import client from "../../client";
import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolverFn: Resolver = async (_, { id }, { loggedInUser }) => {
  if (!loggedInUser) {
    return null;
  }
  const result = await client.room.findFirst({
    where: {
      id,
      users: {
        some: {
          id: loggedInUser.id
        }
      }
    }
  });
  return result;
};
export default {
  Query: {
    seeRoom: protectedResolver(resolverFn)
  }
};
