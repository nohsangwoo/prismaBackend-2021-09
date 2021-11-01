// import dotenv from "dotenv";
// dotenv.config();
require("dotenv").config(); // 위 import 방식과 같은 방법

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import client from "./client";
import { execute, subscribe } from "graphql";

import { resolvers, schema, typeDefs } from "./schema";
import { getUser } from "./users/users.utils";
import logger from "morgan";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { createServer } from "http";

// A map of functions which return data for the schema.
export const uploadDefaultPath = __dirname + "/uploads";
// console.log("uploadDefaultPath", uploadDefaultPath);

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT;

  const httpServer = createServer(app);

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }) => {
      if (req) {
        const token = String(req.headers.authorization) || "";
        return {
          loggedInUser: await getUser(token)
        };
      }
    },
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          };
        }
      }
    ]
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );

  await server.start();

  // morgan은 로그보는 모듈이니 제일 최상단에 적용시켜줘야한다.
  app.use(logger("tiny"));

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  // console.log("__dirname", __dirname);
  // 첫번째 인자 뜻 : localhost:4000/uploads
  // 두번째 인자 뜻 : localhost:4000/uploads로 접속했을때 불러오려는 실제 local위치
  // 즉 첫번째 인자는 아무렇게나 내맘대로 지정해도되는데 두번째 인자는 실제로 있는 경로를 가져와야함
  app.use("/uploads", express.static(uploadDefaultPath));

  server.applyMiddleware({ app });

  // @ts-ignore
  await new Promise(r => httpServer.listen({ port: PORT }, r));

  // httpServer.listen(PORT, () =>
  //   console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  // );

  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
};

startServer();
