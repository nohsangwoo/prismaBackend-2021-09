import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolverFn: Resolver = async (_, { file, caption }, { loggedInUser }) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: String
    };

    if (caption) {
      // parse caption
      // get or create hashtags
    }

    // save the photo with parsed hashtags
    // add the photo to the hashtags
  }
};

export default {
  Mutation: {
    uploadPhoto: protectedResolver(resolverFn)
  }
};
