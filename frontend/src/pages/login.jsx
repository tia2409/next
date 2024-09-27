import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { useTranslation } from "react-i18next";

// component
import LocaleSelect from "@/component/LocaleSelect";
import ErrorMsg from "@/component/ErrorMsg";
import BasicInput from "@/component/BasicInput";

// image
import Banner from "../../public/images/banner/rain_banner_01.png";
import Logo from "../../public/images/logo/logo-black.svg";

export default function Login() {
  const { t } = useTranslation();
  const router = useRouter();

  const [checkLogin, setCheckLogin] = useState();
  const [loginFormData, setLoginFormData] = useState({
    user_id: "",
    user_pwd: "",
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/Login", loginFormData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data == "1") {
          sessionStorage.setItem("user_id", loginFormData.user_id);
          router.push("/main");
        } else {
          setCheckLogin(true);
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
    <div className="flex items-center justify-center h-screen bg-gray06">
      {/* 왼쪽 배너 */}
      <Image
        className="w-[780px] h-[760px]"
        src={Banner}
        width={780}
        height={760}
        alt="banner"
      />
      {/* 오른쪽 로그인Form */}
      <div className="relative w-[360px] h-[760px] bg-white p-4">
        <div className="flex flex-col justify-center items-center m-[50px] mt-[170px]">
          <Image src={Logo} width={126} height={70} alt="logo" />
        </div>
        <form
          className="flex flex-col gap-[12px]"
          method="post"
          onSubmit={handleLoginSubmit}
        >
          <BasicInput
            width="328"
            height="44"
            inputId="user_id"
            inputImg="user"
            leftIcon={true}
            placeholder={t("login.insertID")}
            value={loginFormData.user_id}
            onFocus={handleInputFocus}
            onChange={(e) =>
              setLoginFormData({ ...loginFormData, user_id: e.target.value })
            }
          />
          <BasicInput
            width="328"
            height="44"
            inputType="password"
            inputId="user_pwd"
            inputImg="password"
            leftIcon={true}
            placeholder={t("login.insertPW")}
            value={loginFormData.user_pwd}
            onFocus={handleInputFocus}
            onChange={(e) =>
              setLoginFormData({ ...loginFormData, user_pwd: e.target.value })
            }
          />
          {checkLogin ? <ErrorMsg message={t("login.error")} /> : ""}
          <button className="h-[48px] text-white bg-main02 rounded-[3px] hover:bg-main01">
            {t("login.button")}
          </button>
        </form>
        <div className="flex justify-between py-[24px]">
          <div className="flex items-center">
            <input id="save_id" type="checkbox" />
            <div className="pl-2 text-sm font-semibold text-gray04">
              {t("login.saveID")}
            </div>
          </div>
          <LocaleSelect />
        </div>
        <div className="absolute flex justify-center items-center bottom-0 right-0 w-[360px] h-[60px]">
          <div className=" text-gray04 font-semibold px-[20px] border-r border-gray04 cursor-pointer">
            {t("login.find")}
          </div>
          <div className=" text-gray04 font-semibold px-[20px] cursor-pointer">
            {t("login.join")}
          </div>
        </div>
      </div>
    </div>
  );
}
