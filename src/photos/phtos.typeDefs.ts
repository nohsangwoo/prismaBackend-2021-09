import { gql } from "apollo-server-express";
export default gql`
    scalar Upload
    type Photo {
        id: Int!
        user: User!
        file: String!
        caption: String
        likes: Int!
        commentNumber: Int!
        comments: [Comment]
        hashtags: [Hashtag]
        isMine: Boolean!
        isLiked: Boolean!
        createdAt: String!
        updatedAt: String!
    }
`;
