import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    caption: String
    likes: Int!
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
  }
`;
