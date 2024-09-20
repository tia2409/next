import { useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";

import IconInput from "@/component/IconInput";

import RoundButton from "@/component/RoundButton";
import Image from "next/image";
import banner from "../../public/images/banner/rain_banner_01.png";
import logo from "../../public/images/logo/Img_Logo.svg";
import idIcon from "../../public/images/icons/id_input.svg";
import pwIcon from "../../public/images/icons/pw_input.svg";
import LocaleSelect from "@/component/LocaleSelect";
import CheckInput from "@/component/CheckInput";
import ErrorMsg from "@/component/ErrorMsg/index.jsx";

export default function Login() {
  const router = useRouter();
  const [checkLogin, setCheckLogin] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    user_id: "",
    user_pwd: "",
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/DB_test", loginFormData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data == "success") {
          sessionStorage.setItem("user_id", loginFormData.user_id);
          router.push("/main");
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleInputFocus = () => {
    setCheckLogin(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#282c32]">
      {/* 왼쪽 배너 */}
      <div className="w-780">
        {/* 임시로 class 부여 현재 배너이미지 780 * 760 아님 */}
        <Image
          className="w-[780px] h-[760px]"
          src={banner}
          width={780}
          height={760}
          alt="banner"
        />
      </div>
      {/* 오른쪽 로그인Form */}
      <div className="relative border border-[#363636] w-[360px] h-[760px] bg-[#363636] p-4">
        <div className="flex flex-col justify-center items-center m-[50px] mt-[170px]">
          <Image src={logo} width={126} height={70} alt="logo" />
        </div>
        <form
          className="flex flex-col gap-[12px]"
          method="post"
          onSubmit={handleLoginSubmit}
        >
          <IconInput
            inputType="id"
            inputId="user_id"
            inputImg={idIcon}
            placeholder="아이디를 입력해주세요."
            value={loginFormData.user_id}
            onFocus={handleInputFocus}
            onChange={(e) =>
              setLoginFormData({ ...loginFormData, user_id: e.target.value })
            }
          />
          <IconInput
            inputType="password"
            inputId="user_pwd"
            inputImg={pwIcon}
            placeholder="비밀번호를 입력해주세요."
            value={loginFormData.user_pwd}
            onFocus={handleInputFocus}
            onChange={(e) =>
              setLoginFormData({ ...loginFormData, user_pwd: e.target.value })
            }
          />
          {checkLogin ? (
            <ErrorMsg message="로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요." />
          ) : (
            ""
          )}
          <RoundButton innerText="로그인" />
        </form>
        <div className="flex justify-between py-[24px]">
          <CheckInput inputId="user_id_save" content="아이디 저장" />
          <LocaleSelect />
        </div>
        <div className="absolute flex justify-center items-center bottom-0 right-0 w-[360px] h-[60px]">
          <div className=" text-[#909090] px-[20px] border-r border-[#7a7a7a] cursor-pointer">
            아이디·비밀번호 찾기
          </div>
          <div className=" text-[#909090] px-[20px] cursor-pointer">
            회원가입
          </div>
        </div>
      </div>
    </div>
  );
}
