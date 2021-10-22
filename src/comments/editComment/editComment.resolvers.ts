import client from "../../client";
import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolverFn: Resolver = async (_, { id, payload }, { loggedInUser }) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: "you need to login"
    };
  }

  const existComment = await client.comment.findUnique({
    where: {
      id
    },
    select: {
      userId: true
    }
  });

  if (!existComment) {
    return {
      ok: false,
      error: "Comment not found"
    };
  } else if (existComment.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "Not authorized"
    };
  }

  await client.comment.update({
    where: {
      id
    },
    data: {
      payload
    }
  });

  return {
    ok: true
  };
};

export default {
  Mutation: {
    editComment: protectedResolver(resolverFn)
  }
};
