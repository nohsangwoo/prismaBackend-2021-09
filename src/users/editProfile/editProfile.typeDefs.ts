import { gql } from "apollo-server-express";

export default gql`
  type EditPrifileResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editProfile(
      firstName: String
      firstName: String
      lastName: String
      userName: String
      email: String
      password: String
      bio: String
    ): EditPrifileResult!
  }
`;
