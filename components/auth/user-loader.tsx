import { useEffect } from "react";
import { refreshFunc } from "libs/api/auth";
import { graphQLClient } from "libs/gql/request";
import { useRecoilState, useResetRecoilState } from "recoil";
import { authAtom } from "libs/recoil/auth";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

function storePathValues() {
  const storage = globalThis?.sessionStorage;

  if (!storage) return;

  const prevPath = storage.getItem("currentPath") as string;

  storage.setItem("prevPath", prevPath);
  storage.setItem("currentPath", globalThis.location.pathname);
}

const UserLoader = () => {
  const [user, setUser] = useRecoilState(authAtom);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await refreshFunc();
        console.log("setting user", res);
        setUser(res);
        graphQLClient.setHeader("authorization", `Bearer ${user?.accessToken}`);
      } catch (e) {
        console.log(e);
        setUser({ accessToken: "", user: { username: "" } });
      }
    })();
  }, []);

  useEffect(() => {
    storePathValues();
  }, [router.asPath]);

  //url로 접근 시 /posts/[id] 같은 형태
  // useEffect(() => {
  //   console.log("router path", router.asPath);
  // }, [router.asPath]);

  return <div></div>;
};

export default UserLoader;
