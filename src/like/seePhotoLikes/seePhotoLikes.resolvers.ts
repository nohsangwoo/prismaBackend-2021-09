import client from "../../client";
import { Resolver } from "../../types";

const resolverFn: Resolver = async (_, { id }) => {
  const likes = await client.like.findMany({
    where: {
      photoId: id
    },
    select: {
      user: true
    }
  });
  const result = likes.map(data => data.user);
  return result;
};

export default {
  Query: {
    seePhotoLikes: resolverFn
  }
};
