import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { useTranslation } from "react-i18next";

// image
import Banner from "../../public/images/banner/main-img.png";
import BannerLine from "../../public/images/banner/main-img-line.svg";
import Logo from "../../public/images/logo/img-logo-horizontal.jpg";
import IconId from "../../public/images/icons/input/user.svg";
import IconPw from "../../public/images/icons/input/password.svg";

// component
import LocaleSelect from "@/component/Select/Locale";
import ErrorMessage from "@/component/Input/ErrorMessage";
import BasicInput from "@/component/Input/BasicInput";

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
      <div className="relative">
        <Image
          className="w-[820px] h-[760px]"
          src={Banner}
          width={820}
          height={760}
          alt="banner"
        />
        <div className="absolute text-white left-[30px] top-[44px]" >
          <div className="font-bold text-[20px] leading-[29px]">Movement that inspires</div>
          <div className="font-regular text-[16px] leading-[24px]">All creative activities begin with a movement!</div>
          <Image
            className="w-[625.5px] h-[1px] mt-[20px] mb-[15px]"
            src={BannerLine}
            width={625.5}
            height={1}
            alt="bannerline"
          />
          <div className="font-bold text-[30px] leading-[44px]">기아 광주</div>
        </div>
      </div>
      {/* 오른쪽 로그인Form */}
      <div className="relative w-[360px] h-[760px] bg-white p-4">
        <div className="flex flex-col justify-center items-center mt-[274px] mb-[24px]">
          <Image src={Logo} width={101} height={24} alt="logo" />
        </div>
        <form
          className="flex flex-col gap-[10px]"
          method="post"
          onSubmit={handleLoginSubmit}
        >
          <BasicInput
            width="328"
            height="44"
            inputId="user_id"
            inputImg={IconId}
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
            inputImg={IconPw}
            leftIcon={true}
            placeholder={t("login.insertPW")}
            value={loginFormData.user_pwd}
            onFocus={handleInputFocus}
            onChange={(e) =>
              setLoginFormData({ ...loginFormData, user_pwd: e.target.value })
            }
          />
          {checkLogin ? <ErrorMessage message={t("login.error")} /> : ""}
          <button className="h-[48px] text-white bg-main02 rounded-[3px] hover:bg-main01">
            {t("login.login")}
          </button>
        </form>
        <div className="flex justify-between my-[10px]">
          <div className="flex items-center">
            <input id="save_id" type="checkbox" />
            <div className="pl-[12px] text-sm font-medium text-gray04">
              {t("login.saveID")}
            </div>
          </div>
          <LocaleSelect />
        </div>
        <div className="absolute flex justify-center items-center bottom-3 right-0 w-[360px] h-[60px]">
          <div className=" text-gray04 font-semibold px-[20px] border-r border-gray04 cursor-pointer">
            {t("login.findID")}
          </div>
          <div className=" text-gray04 font-semibold px-[20px] cursor-pointer">
            {t("login.findPWD")}
          </div>
        </div>
      </div>
    </div>
  );
}
