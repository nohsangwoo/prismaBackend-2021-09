import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { Resolver, Resolvers } from "../../types";
const resolverFn: Resolver = async (
  _,
  { firstName, lastName, userName, email, password },
  context,
  info
) => {
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
  Mutation: {
    editProfile: protectedResolver(resolverFn)
  }
};

export default resolvers;
