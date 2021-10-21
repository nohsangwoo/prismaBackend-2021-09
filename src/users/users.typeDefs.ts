import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: String!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    bio: String
    avatar: String
    likes: [Like]!
    photos(endCursor: Int): [Photo]
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    commentNumber: Int!
    comments: [Comment]
    createdAt: String!
    updatedAt: String!
  }
`;
