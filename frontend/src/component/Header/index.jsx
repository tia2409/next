import Image from "next/image"; // Image 컴포넌트 임포트
import LocaleSelect from "../LocaleSelect";

import HeaderTitle from "./../../../public/images/logo/logo-white.webp";
import Logout from "./../../../public/images/icons/icon_login.svg";
import Mymenu from "./../../../public/images/icons/icon_mymenu.svg";

export default function Header() {
  let user_id = sessionStorage.getItem("user_id");

  return (
    <div className="flex justify-between items-center w-full h-[72px] px-[20px] bg-black">
      <div className="flex pl-9">
        <Image src={HeaderTitle} width={101} height={24} alt="logo" priority />{" "}
      </div>
      <div className="flex justify-end items-center w-[600px]">
        <LocaleSelect />
        <div className="pl-2">
          <Image src={Logout} alt="logout icon" />
        </div>
        <div className="flex items-center pl-4">
          <Image src={Mymenu} alt="my menu icon" />
          <div className="text-white text-[15px] pl-1">{user_id}</div>
        </div>
      </div>
    </div>
  );
}
