import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { authAtom } from "libs/recoil/auth";
import { FaUser } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getRecoil } from "recoil-nexus";
import { graphQLClient } from "libs/gql/request";
import { refreshFunc } from "../libs/api/auth";

function storePathValues() {
  const storage = globalThis?.sessionStorage;

  if (!storage) return;

  const prevPath = storage.getItem("currentPath") as string;

  storage.setItem("prevPath", prevPath);
  storage.setItem("currentPath", globalThis.location.pathname);
}

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const [user, setUser] = useRecoilState(authAtom);
  const resetUser = useResetRecoilState(authAtom);
  const router = useRouter();

  if (router) {
    console.log(router);
  }

  // useEffect(() => storePathValues, [router.asPath]);

  const onLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/auth/logout",
        {},
        { withCredentials: true }
      );
      resetUser();
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-5 py-3 border-b border-teal-600">
        <div
          className="text-teal-600 text-2xl font-bold cursor-pointer hover:text-teal-700"
          onClick={() => router.push("/")}
        >
          TEAM SEAS
        </div>
        {user?.accessToken ? (
          <div className="flex items-center space-x-2">
            <div className="rounded-full p-2 bg-slate-100 border cursor-pointer hover:bg-slate-200">
              <FaUser className="text-teal-600  text-2xl" />
            </div>
            <button className="hover:text-gray-400" onClick={onLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="py-2 px-6 rounded-full bg-teal-600 text-white font-bold">
            Login
          </button>
        )}
      </nav>
      {children}
    </div>
  );
};

export default Layout;
