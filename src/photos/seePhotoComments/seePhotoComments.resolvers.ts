import client from "../../client";
import { Resolver } from "../../types";

const seePhotoCommentsResolverFn: Resolver = async (_, { id, endCursor }) => {
  return client.comment.findMany({
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
};

export default {
  Query: {
    seePhotoComments: seePhotoCommentsResolverFn
  }
};
