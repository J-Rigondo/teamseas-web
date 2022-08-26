import { getRecoil } from "recoil-nexus";
import { authAtom } from "libs/recoil/auth";
import { PatchedRequestInit } from "graphql-request/dist/types";

export function requestMiddleware(request: PatchedRequestInit) {
  const { accessToken } = getRecoil(authAtom);

  return {
    ...request,
    headers: { ...request.headers, Authorization: `Bearer ${accessToken}` },
  };
}
