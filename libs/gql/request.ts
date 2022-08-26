import { GraphQLClient } from "graphql-request";
import { getRecoil } from "recoil-nexus";
import { authAtom } from "libs/recoil/auth";
import { requestMiddleware } from "libs/gql/request-middleware";

function middleware(request: RequestInit) {
  return {
    ...request,
    headers: { ...request.headers },
  };
}

export const graphQLClient = new GraphQLClient(
  "http://localhost:4000/graphql",
  {
    credentials: "include",
    mode: "cors",
  }
);
