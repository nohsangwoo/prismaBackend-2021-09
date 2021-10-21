import client from "../client";
import { Resolver } from "../types";

const isMineResolverFn: Resolver = async ({ userId }, _, { loggedInUser }) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: "you need to login"
    };
  }
  const result = userId === loggedInUser.id;
  return result;
};
export default {
  Comment: {
    isMine: isMineResolverFn
  }
};
