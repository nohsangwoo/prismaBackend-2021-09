import client from "../client";

export default {
  User: {
    totalFollowing: ({ id }: any) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id
            }
          }
        }
      }),
    totalFollowers: ({ id }: any) =>
      client.user.count({
        where: {
          following: {
            some: {
              id
            }
          }
        }
      })
  }
};
