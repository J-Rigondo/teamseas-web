import { NextPage } from "next";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { BsInstagram } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
import { request, gql } from "graphql-request";
import { useForm } from "react-hook-form";
import GoogleLogin from "react-google-login";
import axios from "axios";

interface IForm {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const { handleSubmit, register } = useForm<IForm>();

  // const { data, isLoading } = useQuery("users", () => {
  //   return request(
  //     "http://localhost:4000/graphql",
  //     gql`
  //       query Users {
  //         users {
  //           id
  //           email
  //           name
  //           posts {
  //             id
  //             createdAt
  //             title
  //           }
  //           _count {
  //             posts
  //           }
  //         }
  //       }
  //     `
  //   );
  // });

  const loginMutation = useMutation((input: any) => {
    return request(
      "http://localhost:4000/graphql",
      gql`
        mutation Mutation($loginUserInput: LoginUserInput!) {
          login(loginUserInput: $loginUserInput) {
            accessToken
            user {
              email
              id
              name
            }
          }
        }
      `,
      input
    );
  });

  const googleMutation = useMutation((tokenId: string) => {
    return request(
      "http://localhost:4000/graphql",
      gql`
        mutation Mutation($tokenId: String!) {
          googleLogin(tokenId: $tokenId) {
            accessToken
          }
        }
      `,
      { tokenId }
    );
  });

  const localLoginMutation = useMutation(
    (form: IForm) => {
      return axios.post("http://localhost:4000/auth/login", form, {
        withCredentials: true,
      });
    },
    {
      onSuccess: (result) => {
        const { data } = result;
        console.log(data);
      },
    }
  );

  const onSubmit = (formData: IForm) => {
    // loginMutation.mutate(
    //   { loginUserInput: { ...formData } },
    //   { onSuccess: (data) => console.log(data) }
    // );

    localLoginMutation.mutate(formData);
  };

  //graphql 방식
  // const responseGoogle = (res: any) => {
  //   console.log(res);
  //   googleMutation.mutate(res.tokenId);
  // };

  const onGoogleLogin = async () => {
    window.location.href = "http://localhost:4000/auth/google/login";
  };

  const onKakaoLogin = () => {
    window.location.href = "http://localhost:4000/auth/kakao/login";
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="max-w-sm flex-1 py-5 px-12 shadow-md rounded-xl h-2/3 bg-gray-50">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="font-bold text-center text-3xl my-14">로그인</h1>
          <input
            {...register("email", { required: true })}
            className="border border-gray-200 py-3 px-4 p rounded-lg w-full focus:outline-none focus:border-teal-600 focus:ring-teal-600 focus:ring-1"
            type="text"
            placeholder="이메일"
          />
          <input
            {...register("password", { required: true })}
            className="border border-gray-200 py-3 px-4 rounded-lg w-full my-4 focus:outline-none focus:border-teal-600 focus:ring-teal-600 focus:ring-1"
            type="password"
            placeholder="비밀번호"
          />
          <div className="flex justify-end">
            <p className="text-gray-400 text-sm hover:">비밀번호 찾기</p>
          </div>

          <button className="rounded-lg text-center p-3 bg-teal-600 hover:bg-teal-700 w-full mt-8 text-white">
            로그인
          </button>
        </form>

        <div className="my-12 relative border-t border-gray-300">
          <div className="flex justify-center">
            <span className="absolute -mt-3.5 text-gray-500 bg-slate-50 px-3">
              or continue with
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            className="flex items-center justify-center rounded-md p-3 font-bold bg-white shadow-md hover:bg-gray-100"
            onClick={onGoogleLogin}
          >
            <FcGoogle className="text-3xl" />
          </button>
          {/*<GoogleLogin*/}
          {/*  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}*/}
          {/*  render={(renderProps) => (*/}
          {/*    <button*/}
          {/*      className="flex items-center justify-center rounded-md p-3 font-bold bg-white shadow-md hover:bg-gray-100"*/}
          {/*      onClick={renderProps.onClick}*/}
          {/*      disabled={renderProps.disabled}*/}
          {/*    >*/}
          {/*      <FcGoogle className="text-3xl" />*/}
          {/*    </button>*/}
          {/*  )}*/}
          {/*  buttonText="Login"*/}
          {/*  onSuccess={responseGoogle}*/}
          {/*  onFailure={responseGoogle}*/}
          {/*  cookiePolicy={"single_host_origin"}*/}
          {/*/>*/}
          <button
            className="flex items-center justify-center rounded-md p-3 bg-yellow-400 shadow-md font-bold hover:bg-yellow-500"
            onClick={onKakaoLogin}
          >
            <RiKakaoTalkFill className="text-3xl" />
          </button>
          <button className="flex items-center justify-center rounded-md p-3  font-bold shadow-md bg-white hover:bg-gray-100">
            <SiNaver className="text-3xl text-green-600" />
          </button>
          <button className="flex items-center justify-center rounded-md p-3 font-bold shadow-md bg-white hover:bg-gray-100">
            <BsInstagram className="text-3xl text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
