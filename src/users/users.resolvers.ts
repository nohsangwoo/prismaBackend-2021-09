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
  if (!context.loggedInUser) {
    return false;
  }
  return id === context?.loggedInUser?.id;
};

const isFollowingFn: Resolver = async ({ id }, _, { loggedInUser }) => {
  if (!loggedInUser) {
    return false;
  }
  const exists = await client.user.count({
    where: {
      id: id,
      followers: {
        some: {
          id: loggedInUser.id
        }
      }
    }
  });
  const result = Boolean(exists);
  return result;
};

const photosResolverFn: Resolver = async ({ id }, { endCursor }) => {
  return client.user
    .findUnique({
      where: {
        id: id
      },
      select: {
        photos: true
      }
    })
    .photos({
      take: 5,
      skip: endCursor ? 1 : 0,
      ...(endCursor && {
        cursor: {
          id: endCursor
        }
      })
    });
};

const likesResolverFn: Resolver = async ({ id }) => {
  return client.like.findMany({
    where: {
      userId: id
    }
  });
};

export default {
  User: {
    totalFollowing: totalFollowingResolverFn,
    totalFollowers: totalFollowersResolverFn,
    isMe: protectedResolver(isMeResolverFn),
    isFollowing: isFollowingFn,
    photos: photosResolverFn,
    likes: likesResolverFn
  }
};
