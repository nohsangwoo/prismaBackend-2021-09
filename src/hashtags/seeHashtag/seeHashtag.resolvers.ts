import client from "../../client";
import { Resolver } from "../../types";

const seeHashtagResolverFn: Resolver = async (_, { hashtag }) => {
  return client.hashtag.findUnique({
    where: {
      hashtag
    }
  });
};

export default {
  Query: {
    seeHashtag: seeHashtagResolverFn
  }
};
