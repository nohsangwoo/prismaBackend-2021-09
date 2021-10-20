import client from "../../client";
import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

const resolverFn: Resolver = async (_, { id, caption }, { loggedInUser }) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: "you need to login"
    };
  }
  const prevHashtags = await client.photo
    .findFirst({
      where: {
        id,
        userId: loggedInUser.id
      },
      select: {
        hashtags: true
      }
    })
    .hashtags({
      select: {
        hashtag: true
      }
    });

  if (!prevHashtags) {
    return {
      ok: false,
      error: "Photo not found"
    };
  }

  await client.photo.update({
    where: {
      id
    },
    data: {
      caption,
      hashtags: {
        disconnect: prevHashtags,
        connectOrCreate: processHashtags(caption)
      }
    }
  });
  const result = { ok: true };
  return result;
};

export default {
  Mutation: {
    editPhoto: protectedResolver(resolverFn)
  }
};
