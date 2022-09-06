import { useRecoilValue } from "recoil";
import { authAtom } from "libs/recoil/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface IProps {
  authProps: any;
}

const PrivateRoute = ({
  authProps,
  children,
}: React.PropsWithChildren<IProps>) => {
  const router = useRouter();
  const user = useRecoilValue(authAtom);
  const isLogin = !!user?.accessToken;

  console.log("private route user", user);

  useEffect(() => {
    if (user && !isLogin) {
      console.log("go to login");
      router.replace("/login");
      // console.log(globalThis.location.pathname);
    }
  }, [user]);

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen flex items-center justify-center text-3xl font-bold">
      ...Loading
    </div>
  );
};

export default PrivateRoute;
