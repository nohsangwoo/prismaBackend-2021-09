import { ApolloServer, gql } from "apollo-server";

// The GraphQL schema
const typeDefs = gql`
  type Movie {
    title: String
    year: Int
  }
  type Query {
    "A simple type for getting started!"
    movies: [Movie]
    movie: Movie
  }
  type Query {
    hello: String
  }
  type Mutation {
    createMovie(title: String!): Boolean
    deleteMovie(title: String!): Boolean
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "hello~",
  },
  Query: {
    movies: () => [],
    movie: () => ({ title: "hello", year: 1989 }),
  },
  Mutation: {
    createMovie: (root, args, context, info) => {
      //   console.log("root, ", root);
      console.log("args, ", args);
      //   console.log("context, ", context);
      //   console.log("info, ", info);
      return true;
    },
    deleteMovie: (root, args, context, info) => {
      //   console.log("root, ", root);
      console.log("args, ", args);
      //   console.log("context, ", context);
      //   console.log("info, ", info);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
