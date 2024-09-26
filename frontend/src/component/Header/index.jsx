import Image from "next/image"; // Image 컴포넌트 임포트
import LocaleSelect from "../LocaleSelect";

import HeaderTitle from "./../../../public/images/logo/logo-white.webp";
import Logout from "./../../../public/images/icons/icon_login.svg";
import Mymenu from "./../../../public/images/icons/icon_mymenu.svg";

export default function Header() {
  return (
    <div className="flex justify-between items-center w-full h-[72px] px-[20px] bg-black">
      <div className="flex pl-9">
        <Image src={HeaderTitle} width={101} height={24} alt="logo" priority />{" "}
      </div>
      <div className="flex justify-end items-center w-[600px]">
        <div>
          <LocaleSelect />
        </div>
        <div>
          <Image src={Logout} alt="logout icon" />
        </div>
        <div className="pl-4">
          <Image src={Mymenu} alt="my menu icon" />
        </div>
        {/* <div className="pl-4">
          <Image
            className="rounded-full border-gray04 bg-gray03"
            src={DefaultUser}
            alt="default user icon" // alt 속성 추가
          />
        </div> */}
      </div>
    </div>
  );
}
