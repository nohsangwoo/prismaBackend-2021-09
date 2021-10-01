// import dotenv from "dotenv";
// dotenv.config();
require("dotenv").config(); // 위 import 방식과 같은 방법

import { ApolloServer } from "apollo-server";
import schema from "./schema";

// A map of functions which return data for the schema.

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const token = String(req.headers.authorization) || "";
    return {
      token
    };
  }
});

const PORT = process.env.PORT;

server.listen(PORT).then(props => {
  // console.log("props", props);
  console.log(`🚀 Server ready at ${props.url}`);
});
