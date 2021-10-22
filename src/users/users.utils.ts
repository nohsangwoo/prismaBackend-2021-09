import jwt from "jsonwebtoken";
import client from "../client";
import { Context, Resolver } from "../types";

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }

    if (!process.env.JWT_SECRET_KEY) {
      return null;
    }
    let verifiedTotken: any = await jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );
    if ("id" in verifiedTotken) {
      const user = await client.user.findUnique({
        where: {
          id: verifiedTotken["id"]
        }
      });
      if (user) {
        return user;
      }
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const protectedResolver = (ourResolver: Resolver) => {
  return (root: any, args: any, context: Context, info: any) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action"
      };
    }
    return ourResolver(root, args, context, info);
  };
};
