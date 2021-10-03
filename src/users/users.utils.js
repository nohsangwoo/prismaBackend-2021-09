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

export const protectResolver = user => {
  if (!user) {
    throw new Error("You need to login");
  }
};
