import { ApolloServer } from "apollo-server";
import schema from "./schema";

// A map of functions which return data for the schema.

const server = new ApolloServer({
  schema
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
