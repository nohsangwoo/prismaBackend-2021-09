// import dotenv from "dotenv";
// dotenv.config();
require("dotenv").config(); // 위 import 방식과 같은 방법

import { ApolloServer } from "apollo-server";
import schema from "./schema";

// A map of functions which return data for the schema.

const server = new ApolloServer({
  schema,
  context: {
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMzMDUzMTg2fQ.L7SaKHLWbCernpyDvfsPRrvJONw1IQQb_ag915wzMmc"
  }
});

const PORT = process.env.PORT;

server.listen(PORT).then(props => {
  // console.log("props", props);
  console.log(`🚀 Server ready at ${props.url}`);
});
