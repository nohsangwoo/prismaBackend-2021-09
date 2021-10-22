import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

const resolverFn: Resolver = async (_, { file, caption }, { loggedInUser }) => {
  if (!loggedInUser) {
    return null;
  }

  const fileUrl = await uploadToS3(file, loggedInUser?.id, "uploads");

  let hashtagObj: any[] = [];
  // save the photo with parsed hashtags
  // add the photo to the hashtags
  if (caption) {
    // parse caption
    // get or create hashtags
    hashtagObj = processHashtags(caption);
  }

  const result = await client.photo.create({
    data: {
      file: fileUrl,
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
