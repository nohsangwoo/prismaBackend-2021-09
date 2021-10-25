import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    sendMessage2(payload: String!, roomId: Int, userId: Int): MutationResponse!
  }
`;
