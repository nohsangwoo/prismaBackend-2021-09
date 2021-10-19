import client from "../client";
import { Resolver } from "../types";

const photosResolversFn: Resolver = async (
  { id },
  { endCursor },
  { loggedInUser }
) => {
  //   console.log("endCursor", endCursor);
  const result = await client.hashtag
    .findUnique({
      where: {
        id
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

  return result;
};

const totalPhotosResolversFn: Resolver = async ({ id }) => {
  return client.photo.count({
    where: {
      hashtags: {
        some: {
          id
        }
      }
    }
  });
};

export default {
  Hashtag: {
    photos: photosResolversFn,
    totalPhotos: totalPhotosResolversFn
  }
};
