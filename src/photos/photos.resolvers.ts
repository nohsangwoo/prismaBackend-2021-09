import client from "../client";
import { Resolver } from "../types";

const userResolverFn: Resolver = async ({ userId }) => {
  return client.user.findUnique({
    where: {
      id: userId
    }
  });
};

const hashTagsResolverFn: Resolver = async ({ id }) => {
  return client.hashtag.findMany({
    // hashtag중 photo안에 id가 포함된 것을 찾아달라.
    where: {
      photos: {
        some: {
          id
        }
      }
    }
  });
};

const likesResolverFn: Resolver = async ({ id }) =>
  client.like.count({ where: { photoId: id } });

const commentNumberResolverFn: Resolver = async ({ id }) => {
  return client.comment.count({
    where: {
      photoId: id
    }
  });
};

const commentsResolverFn: Resolver = async ({ id }) => {
  return client.comment.findMany({
    where: {
      photoId: id
    },
    include: {
      user: true
    }
  });
};

const isMineResolverFn: Resolver = async ({ userId }, _, { loggedInUser }) => {
  if (!loggedInUser) {
    return false;
  }
  return userId === loggedInUser.id;
};

const isLikedResolverFn: Resolver = async ({ id }, _, { loggedInUser }) => {
  if (!loggedInUser) {
    return false;
  }
  const ok = await client.like.findUnique({
    where: {
      userId_photoId: {
        userId: loggedInUser?.id,
        photoId: id
      }
    },
    select: {
      id: true
    }
  });

  if (ok) {
    return true;
  }
  return false;
};

export default {
  Photo: {
    user: userResolverFn,
    hashtags: hashTagsResolverFn,
    likes: likesResolverFn,
    commentNumber: commentNumberResolverFn,
    comments: commentsResolverFn,
    isMine: isMineResolverFn,
    isLiked: isLikedResolverFn
  }
};
