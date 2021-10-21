import client from "../client";
import { Resolver } from "../types";

const isMineResolverFn: Resolver = async ({ userId }, _, { loggedInUser }) => {
  if (!loggedInUser) {
    return false;
  }
  const result = userId === loggedInUser.id;
  return result;
};

export default {
  Comment: {
    isMine: isMineResolverFn
  }
};
