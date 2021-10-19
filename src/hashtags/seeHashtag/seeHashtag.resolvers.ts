import client from "../../client";
import { Resolver } from "../../types";

const resolverFn: Resolver = async (_, { hashtag }) => {
  return client.hashtag.findUnique({
    where: {
      hashtag
    }
  });
};

export default {
  Query: {
    seeHashtag: resolverFn
  }
};
