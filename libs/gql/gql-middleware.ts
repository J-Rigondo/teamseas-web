import { getRecoil } from "recoil-nexus";
import { authAtom } from "libs/recoil/auth";
import { PatchedRequestInit, Response } from "graphql-request/dist/types";

export function reqMiddleware(request: PatchedRequestInit) {
  const auth = getRecoil(authAtom);

  return {
    ...request,
    headers: {
      ...request.headers,
      Authorization: `Bearer ${auth?.accessToken}`,
    },
  };
}

export function resMiddleware(response: Response<unknown> | Error) {
  console.log("middleware response", response);

  // @ts-ignore
  if (response.response?.errors?.[0].extensions.code === "UNAUTHENTICATED") {
    window.location.href = "/login";
  }
}
