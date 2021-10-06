import bcrypt from "bcrypt";
import client from "../../client";
import { Resolver, Resolvers } from "../../types";
const resolverFn: Resolver = async (
  _,
  { firstName, lastName, userName, email, password }
) => {
  try {
    const existingUser = await client.user.findFirst({
      where: {
        OR: [
          {
            userName
          },
          {
            email
          }
        ]
      }
    });
    if (existingUser) {
      throw new Error("This userName/password is already taken.");
    }
    const uglyPassword = await bcrypt.hash(password, 10);
    await client.user.create({
      data: {
        userName,
        email,
        firstName,
        lastName,
        password: uglyPassword
      }
    });
    return {
      ok: true
    };
  } catch (e: any) {
    // if (e instanceof Error) {
    // }
    return {
      ok: false,
      error: e.message || "Cant create account."
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    createAccount: resolverFn
  }
};

export default resolvers;
