import client from "../../client";
import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolverFn: Resolver = async (_, { id }, { loggedInUser }) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: "tou need to login"
    };
  }

  const existPhoto = await client.photo.findUnique({
    where: {
      id
    },
    select: {
      userId: true
    }
  });

  if (!existPhoto) {
    return {
      ok: false,
      error: "Photo not exist"
    };
  } else if (existPhoto.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "Not authorized."
    };
  }

  await client.photo.delete({
    where: {
      id
    }
  });

  return {
    ok: true
  };
};

export default {
  Mutation: {
    deletePhoto: protectedResolver(resolverFn)
  }
};
