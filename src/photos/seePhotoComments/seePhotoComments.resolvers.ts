import client from "../../client";
import { Resolver } from "../../types";

const seePhotoCommentsResolverFn: Resolver = async (_, { id, endCursor }) => {
  const result = await client.comment.findMany({
    where: {
      photoId: id
    },
    include: {
      user: true
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 5,
    skip: endCursor ? 1 : 0,
    ...(endCursor && { cursor: { id: endCursor } })
  });
  return result;
};

export default {
  Query: {
    seePhotoComments: seePhotoCommentsResolverFn
  }
};
