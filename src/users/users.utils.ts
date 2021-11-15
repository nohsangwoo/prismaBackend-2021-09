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
      const isQuery = info.operation.operation === "query";
      // 로그인이 안된상태에서 query가 걸린경우
      if (isQuery) {
        return null;
      }

      // 로그인이 안된상태에서 mutation이 걸린경우
      return {
        ok: false,
        error: "Please log in to perform this action"
      };
    }
    return ourResolver(root, args, context, info);
  };
};
