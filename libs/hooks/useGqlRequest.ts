import { GraphQLClient } from "graphql-request";
import { useRecoilValue } from "recoil";
import { authAtom } from "libs/recoil/auth";
import { useEffect, useState } from "react";
import { resMiddleware } from "libs/gql/gql-middleware";

const useGqlRequest = () => {
  const auth = useRecoilValue(authAtom);
  const [client, setClient] = useState<GraphQLClient>();

  useEffect(() => {
    const graphQLClient = new GraphQLClient("http://localhost:4000/graphql", {
      credentials: "include",
      mode: "cors",
      responseMiddleware: resMiddleware,
    });

    if (auth?.accessToken) {
      graphQLClient.setHeader("authorization", `Bearer ${auth.accessToken}`);
    }

    setClient(graphQLClient);
  }, [auth?.accessToken]);

  return client;
};

export default useGqlRequest;
