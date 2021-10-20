import client from "../../client";
import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolverFn: Resolver = async (_, { id }, { loggedInUser }) => {
  const existPhoto = client.photo.findUnique({
    where: {
      id
    }
  });

  if (!existPhoto) {
    return {
      ok: false,
      error: "Photo not found"
    };
  }
};

export default {
  Mutation: {
    toggleLike: protectedResolver(resolverFn)
  }
};
