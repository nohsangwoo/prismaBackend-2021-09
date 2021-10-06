import { gql } from "apollo-server";

export default gql`
  scalar Upload

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
      avatar: Upload
    ): EditPrifileResult!
  }
`;