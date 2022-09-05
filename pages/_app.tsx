import "styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import RecoilNexus from "recoil-nexus";
import PrivateRoute from "components/auth/private-route";
import UserLoader from "components/auth/user-loader";

const queryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  authentication?: { loginOnly: boolean };
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const authProps = Component.authentication;

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <RecoilNexus />
        <UserLoader />
        {authProps ? (
          <PrivateRoute authProps={authProps}>
            {getLayout(<Component {...pageProps} />)}
          </PrivateRoute>
        ) : (
          <>{getLayout(<Component {...pageProps} />)}</>
        )}
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
