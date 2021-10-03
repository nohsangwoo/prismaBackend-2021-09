import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, userName, email, password },
      context
    ) => {
      context.protectResolver(context.loggedInUser);

      let uglyPassword = null;
      if (password) {
        uglyPassword = await bcrypt.hash(password, 10);
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
    }
  }
};
