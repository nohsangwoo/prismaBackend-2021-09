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

export default {
  Photo: {
    user: userResolverFn,
    hashtags: hashTagsResolverFn,
    commentNumber: commentNumberResolverFn,
    comments: commentsResolverFn
  }
};
