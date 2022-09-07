import { GraphQLClient } from "graphql-request";
import { reqMiddleware, resMiddleware } from "libs/gql/gql-middleware";

export const graphQLClient = new GraphQLClient(
  "http://localhost:4000/graphql",
  {
    credentials: "include",
    mode: "cors",
    requestMiddleware: reqMiddleware,
    responseMiddleware: resMiddleware,
  }
);
