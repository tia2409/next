import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// image
import HeaderTitle from "./../../../../public/images/logo/logo_white.webp";
import IconLogout from "./../../../../public/images/icons/layout/login.svg";
import IconMymenu from "./../../../../public/images/icons/layout/mymenu.svg";

// component
import LocaleSelect from "../../Select/Locale";

export default function Header() {
  const [userId, setUserId] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = sessionStorage.getItem("user_id");
      setUserId(storedUserId);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user_id");
    router.push("/");
  };

  return (
    <div className="flex justify-between items-center w-full h-[72px] px-[20px] bg-black">
      <div className="flex pl-9">
        <Image
          src={HeaderTitle}
          width={101}
          height={24}
          alt="logo"
          className="cursor-pointer"
          onClick={() => router.push("/main")}
          priority
        />{" "}
      </div>
      <div className="flex justify-end items-center w-[600px]">
        <LocaleSelect />
        <div className="pl-2">
          <Image
            src={IconLogout}
            width={32}
            height={32}
            alt="logout icon"
            className="cursor-pointer"
            onClick={handleLogout}
          />
        </div>
        <div className="flex items-center pl-4">
          <Image
            src={IconMymenu}
            width={32}
            height={32}
            alt="my menu icon"
            className="cursor-pointer"
            // mypage 추가시 수정
            // onClick={() => router.push("/mypage")}
          />
          <div className="text-white text-[15px] pl-1">{userId}</div>
        </div>
      </div>
    </div>
  );
}
