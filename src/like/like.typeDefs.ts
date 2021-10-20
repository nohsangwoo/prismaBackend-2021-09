import { gql } from "apollo-server-express";

export default gql`
  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;
