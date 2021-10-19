import { gql } from "apollo-server-express";

export default gql`
  type Hashtag {
    id: Int!
    hashtag: String!
    photos(endCursor: Int): [Photo]!
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
