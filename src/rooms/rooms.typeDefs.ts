import { gql } from "apollo-server-express";

export default gql`
  type Room {
    id: Int!
    unreadTotal: Int!
    users: [User]
    messages: [Message]
    createdAt: String
    updatedAt: String
  }
`;
