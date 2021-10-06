// import dotenv from "dotenv";
// dotenv.config();
require("dotenv").config(); // 위 import 방식과 같은 방법

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import client from "./client";
import { resolvers, typeDefs } from "./schema";
import { getUser } from "./users/users.utils";

// A map of functions which return data for the schema.

const startServer = async () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }) => {
      const token = String(req.headers.authorization) || "";
      return {
        loggedInUser: await getUser(token),
        client: client
      };
    }
  });

  await server.start();

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  app.use("/static", express.static("uploads"));

  const PORT = process.env.PORT;
  // @ts-ignore
  await new Promise(r => app.listen({ port: PORT }, r));

  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
};

startServer();
