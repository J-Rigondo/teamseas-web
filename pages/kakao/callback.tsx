import { useEffect } from "react";
import axios from "axios";

const Callback = () => {
  useEffect(() => {
    (async () => {
      if (window !== undefined) {
        const code = new URL(window.location.href).searchParams.get("code");
        console.log(code);

        const res = await axios.post(
          "http://localhost:4000/auth/kakao/login/msa",
          { code }
        );

        console.log(res.data);
      }
    })();
  }, []);

  return <div></div>;
};

export default Callback;
