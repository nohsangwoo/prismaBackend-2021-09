export default {
  User: {
    totalFollowing: (root: any) => {
      console.log("root", root);
      return 0;
    },
    totalFollowers: () => 666
  }
};
