import client from "../../client";
import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolverFn: Resolver = async (_, __, { loggedInUser }) => {
  if (!loggedInUser) {
    return null;
  }

  const result = await client.room.findMany({
    where: {
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
    seeRooms: protectedResolver(resolverFn)
  }
};
