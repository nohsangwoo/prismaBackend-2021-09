import client from "../../client";
import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolverFn: Resolver = async (
  _,
  { photoId, payload },
  { loggedInUser }
) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: "you need to login"
    };
  }

  const existPhoto = await client.photo.findUnique({
    where: {
      id: photoId
    },
    select: {
      id: true
    }
  });

  if (!existPhoto) {
    return {
      ok: false,
      error: "Photo not found"
    };
  }
  const newComment = await client.comment.create({
    data: {
      photo: {
        connect: {
          id: photoId
        }
      },
      user: {
        connect: {
          id: loggedInUser.id
        }
      },
      payload
    }
  });

  const result = {
    ok: true,
    id: newComment.id
  };
  return result;
};

export default {
  Mutation: {
    createComment: protectedResolver(resolverFn)
  }
};
