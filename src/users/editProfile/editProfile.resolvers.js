import client from "../../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, userName, email, password },
      context,
      info
    ) => {
      const { token } = context;
      const verifiedTotken = await jwt.verify(
        token,
        process.env.JWT_SECRET_KEY
      );

      let uglyPassword = null;
      if (password) {
        uglyPassword = await bcrypt.hash(password, 10);
      }

      const ok = await client.user.update({
        where: {
          id: verifiedTotken.id
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
    }
  }
};
