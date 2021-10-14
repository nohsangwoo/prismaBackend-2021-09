import { gql } from "apollo-server-express";

export default gql`
  type SeefollowingResult {
    ok: Boolean
    error: String
    following: [User]
  }
  type Query {
    seeFollowing(userName: String!, endCursor: Int): SeefollowingResult!
  }
`;
