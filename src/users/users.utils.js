import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async token => {
  try {
    if (!token) {
      return null;
    }
    const verifiedTotken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await client.user.findUnique({
      where: {
        id: verifiedTotken.id
      }
    });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export const protectedResolver = ourResolver => (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: "Please log in to perform this action"
    };
  }
  return ourResolver(root, args, context, info);
};
