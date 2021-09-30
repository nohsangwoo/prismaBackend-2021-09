import client from "../../client";
export default {
  Query: {
    seeProfile: async (_, { userName }) => {
      try {
        return client.user.findUnique({
          where: {
            userName
          }
        });
      } catch (e) {
        return e;
      }
    }
  }
};
