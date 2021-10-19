import client from "../../client";
import { Resolver } from "../../types";

const resolverFn: Resolver = async (_, { id }) => {
  return client.photo.findUnique({
    where: {
      id
    }
  });
};

export default {
  Query: {
    seePhoto: resolverFn
  }
};
