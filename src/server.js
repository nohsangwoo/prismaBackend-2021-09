import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from ".prisma/client";

const client = new PrismaClient();
// The GraphQL schema
const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    "A simple type for getting started!"
    movies: [Movie]
    movie(id: Int!): Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(id: Int!, title: String): Movie
  }
`;

// A map of functions which return data for the schema.

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_, { id }) =>
      client.movie.findUnique({
        where: {
          id
        }
      })
  },
  //
  Mutation: {
    createMovie: (root, { title, year, genre }) => {
      return client.movie.create({
        data: {
          title,
          year,
          genre
        }
      });
    },
    deleteMovie: (root, { id }, context, info) => {
      return client.movie.delete({
        where: {
          id
        }
      });
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
