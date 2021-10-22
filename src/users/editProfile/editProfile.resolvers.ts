import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { Resolver, Resolvers } from "../../types";
import { GraphQLUpload } from "graphql-upload";
import { uploadDefaultPath } from "../../server";
import uploadToServer from "../../utils/uploadToServer";
import { uploadToS3 } from "../../shared/shared.utils";

const resolverFn: Resolver = async (
  _,
  { firstName, lastName, userName, email, password, bio, avatar },
  { loggedInUser },
  info
) => {
  let avatarUrl = undefined;
  if (!loggedInUser?.id) {
    return {
      ok: false,
      error: "you need to login"
    };
  }

  if (avatar) {
    avatarUrl = await uploadToS3(avatar, loggedInUser?.id, "avatars");
  }

  let uglyPassword = null;
  if (password) {
    uglyPassword = await bcrypt.hash(password, 10);
  }

  if (!loggedInUser) {
    return {
      ok: false,
      error: "Could not update Profile"
    };
  }

  const ok = await client.user.update({
    where: {
      id: loggedInUser.id
    },
    data: {
      firstName,
      lastName,
      userName,
      email,
      bio,
      ...(uglyPassword && { password: uglyPassword }),
      ...(avatarUrl && { avatar: avatarUrl })
    }
  });
  if (ok) {
    return {
      ok: true
    };
  } else {
    return {
      ok: false,
      error: "Could not update Profile"
    };
  }
};

const resolvers: Resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(resolverFn)
  }
};

export default resolvers;
