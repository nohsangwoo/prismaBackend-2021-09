import client from "../client";
import { Resolver } from "../types";
import { protectedResolver } from "./users.utils";

const totalFollowingResolverFn: Resolver = ({ id }: any) =>
  client.user.count({
    where: {
      followers: {
        some: {
          id
        }
      }
    }
  });

const totalFollowersResolverFn: Resolver = ({ id }: any) =>
  client.user.count({
    where: {
      following: {
        some: {
          id
        }
      }
    }
  });

const isMeResolverFn: Resolver = ({ id }, _, context) => {
  // console.log(id, context.loggedInUser);
  if (!context.loggedInUser) {
    return false;
  }
  return id === context?.loggedInUser?.id;
};

export default {
  User: {
    totalFollowing: totalFollowingResolverFn,
    totalFollowers: totalFollowersResolverFn,
    isMe: protectedResolver(isMeResolverFn)
  }
};
