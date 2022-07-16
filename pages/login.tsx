import {NextPage} from "next";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { BsInstagram } from "react-icons/bs";

const Login:NextPage = () => {


    return (
        <div className="flex items-center justify-center h-[100vh]">
            <div className="max-w-sm flex-1 py-5 px-12 shadow-md rounded-xl h-2/3 bg-gray-50">
                <h1 className="font-bold text-center text-3xl my-14">로그인</h1>
                <input className="border border-gray-200 py-3 px-4 p rounded-lg w-full" type="text" placeholder="이메일"/>
                <input className="border border-gray-200 py-3 px-4 rounded-lg w-full my-4" type="password" placeholder="비밀번호"/>
                <div className="flex justify-end">
                    <p className="text-gray-400 text-sm hover:">비밀번호 찾기</p>
                </div>

                <button className="rounded-lg text-center p-3 bg-teal-600 hover:bg-teal-700 w-full mt-8 text-white">로그인</button>

                <div className="my-12 relative border-t border-gray-300">
                    <div className="flex justify-center">
                        <span className="absolute -mt-3.5 text-gray-500 bg-slate-50">or continue with</span>

                    </div>
                </div>

                <div className="flex justify-between">
                    <button className="flex items-center justify-center rounded-md p-3 font-bold bg-white shadow-md hover:bg-gray-100">
                        <FcGoogle className="text-3xl"/>
                    </button>
                    <button className="flex items-center justify-center rounded-md p-3 bg-yellow-400 shadow-md font-bold hover:bg-yellow-500">
                        <RiKakaoTalkFill className="text-3xl"/>
                    </button>
                    <button className="flex items-center justify-center rounded-md p-3  font-bold shadow-md bg-white hover:bg-gray-100">
                        <SiNaver className="text-3xl text-green-600"/>
                    </button>
                    <button className="flex items-center justify-center rounded-md p-3 font-bold shadow-md bg-white hover:bg-gray-100">
                        <BsInstagram className="text-3xl text-red-500"/>
                    </button>
                </div>


            </div>

        </div>
    );
};

export default Login;