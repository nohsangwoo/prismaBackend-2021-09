import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { Resolver, Resolvers } from "../../types";
import { GraphQLUpload } from "graphql-upload";
// import { finished } from "stream/promises";
import { createWriteStream } from "fs";
const resolverFn: Resolver = async (
  _,
  { firstName, lastName, userName, email, password, bio, avatar },
  context,
  info
) => {
  const { filename, createReadStream } = await avatar;
  const readStream = createReadStream();
  // 저장 경로를 만들어주는 과정
  const whiteStream = createWriteStream(
    process.cwd() +
      "/src/uploads/" +
      context?.loggedInUser?.id +
      Date.now() +
      filename
  );

  // 저장 경로에 저장하는 작업
  readStream.pipe(whiteStream);
  // 마무리 해줘야함 근데 왜그런지 모르겠지만 모듈 찾을수 없다고 에러남
  // finished(whiteStream);

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
      ...(uglyPassword && { password: uglyPassword })
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
