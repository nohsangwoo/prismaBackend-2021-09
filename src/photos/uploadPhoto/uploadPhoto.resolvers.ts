import client from "../../client";
import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

const resolverFn: Resolver = async (_, { file, caption }, { loggedInUser }) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: String
    };
  }
  let hashtagObj: any[] = [];
  // save the photo with parsed hashtags
  // add the photo to the hashtags
  if (caption) {
    // parse caption
    // get or create hashtags
    hashtagObj = processHashtags(caption);
    console.log("hashtags: ", hashtagObj);
    console.log("caption: ", caption);
  }

  const result = await client.photo.create({
    data: {
      file,
      caption,
      user: {
        connect: {
          id: loggedInUser.id
        }
      },
      ...(hashtagObj.length > 0 && {
        hashtags: {
          connectOrCreate: hashtagObj
        }
      })
    }
  });
  return result;
};

export default {
  Mutation: {
    uploadPhoto: protectedResolver(resolverFn)
  }
};
