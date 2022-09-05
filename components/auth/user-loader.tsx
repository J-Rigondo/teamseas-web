import { useEffect } from "react";
import { refreshFunc } from "libs/api/auth";
import { graphQLClient } from "libs/gql/request";
import { useRecoilState, useResetRecoilState } from "recoil";
import { authAtom } from "libs/recoil/auth";

const UserLoader = () => {
  const [user, setUser] = useRecoilState(authAtom);
  const resetUser = useResetRecoilState(authAtom);

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

  return <div></div>;
};

export default UserLoader;
