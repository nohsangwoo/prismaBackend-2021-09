import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";

// A map of functions which return data for the schema.

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
