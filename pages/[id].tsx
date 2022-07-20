import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../libs/recoil/auth";

const LoginContainer = () => {
  const router = useRouter();
  const setter = useSetRecoilState(authAtom);

  useEffect(() => {
    if (router) {
      (async () => {
        const id = router.query.id;
        console.log(id);

        const res = await axios.get(`http://localhost:4000/auth/token/${id}`);
        console.log(res.data);

        router.replace("/");
      })();
    }
  }, [router]);

  return <div>login container</div>;
};

export default LoginContainer;
