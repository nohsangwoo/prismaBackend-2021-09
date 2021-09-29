import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      console.log("createAccount activate!");
      // check if userName  or email are already on DB.
      // because they are(userName and email) unique type.
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
      console.log(existingUser);
    }
  }
};
