import client from "../../client";
import { Resolver } from "../../types";

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
    seeRooms: resolverFn
  }
};
