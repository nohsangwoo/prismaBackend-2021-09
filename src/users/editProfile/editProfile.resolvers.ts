import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { Resolver, Resolvers } from "../../types";
import { GraphQLUpload } from "graphql-upload";
import { uploadDefaultPath } from "../../server";
import uploadToServer from "../../utils/uploadToServer";

const resolverFn: Resolver = async (
  _,
  { firstName, lastName, userName, email, password, bio, avatar },
  context,
  info
) => {
  let avatarUrl = undefined;
  if (!context?.loggedInUser?.id) {
    return {
      ok: false,
      error: "you need to login"
    };
  }

  if (avatar) {
    const uploadFileRegex = `${context?.loggedInUser?.id + Date.now()}`;
    // 서버local에 저장하는 방법
    avatarUrl = await uploadToServer({
      uploadFile: avatar,
      uploadPath: uploadDefaultPath,
      uploadFileRegex: uploadFileRegex
    });
  }

  let uglyPassword = null;
  if (password) {
    uglyPassword = await bcrypt.hash(password, 10);
  }

  if (!context.loggedInUser) {
    return {
      ok: false,
      error: "Could not update Profile"
    };
  }

  const ok = await client.user.update({
    where: {
      id: context.loggedInUser.id
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
