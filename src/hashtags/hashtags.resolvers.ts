import client from "../client";
import { Resolver } from "../types";

const photosResolvers: Resolver = async (
  { id },
  { page },
  { loggedInUser }
) => {
  return client.photo.findUnique({
    where: {
      id
    }
  });
};

export default {
  Hashtag: {
    photos: photosResolvers
  }
};
