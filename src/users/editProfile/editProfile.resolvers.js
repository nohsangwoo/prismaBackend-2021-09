export default {
  Mutation: {
    editProfile: (_, { firstName, lastName, userName, email, password }) => {
      return {
        ok: false,
        error: "non"
      };
    }
  }
};
