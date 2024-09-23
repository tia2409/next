import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import iconMdc from "./../../../public/images/icons/sidebar_mdc.svg";
import iconMdcActive from "./../../../public/images/icons/sidebar_mdc_active.svg";
import iconTool from "./../../../public/images/icons/sidebar_tool.svg";
import iconToolActive from "./../../../public/images/icons/sidebar_tool_active.svg";
import iconAdmin from "./../../../public/images/icons/sidebar_admin.svg";
import iconAdminActive from "./../../../public/images/icons/sidebar_admin_active.svg";
import downArrowBlack from "./../../../public/images/icons/down-arrow-black.svg";
import upArrowWhite from "./../../../public/images/icons/up-arrow-white.svg";

// 이미지 매핑
const iconMap = {
  iconMdc: { default: iconMdc, active: iconMdcActive },
  iconTool: { default: iconTool, active: iconToolActive },
  iconAdmin: { default: iconAdmin, active: iconAdminActive },
};

export default function SidebarButton({
  iconImage,
  href,
  innerText,
  isSidebarOpen,
  isActive,
  hrefDepth,
  innerTextDepth,
}) {
  const router = useRouter(); // router 객체를 가져옵니다.

  return (
    <>
      <Link href={href}>
        <div
          className={`${
            isActive ? "border-[#1976e5] bg-[#E4F2FE]" : "border-[#cfcdcd]"
          } 
            relative w-full h-[44px] leading-[44px] flex items-center space-x-2 mb-2.5 
            overflow-hidden border rounded-[3px]`}
        >
          <Image
            src={
              isActive ? iconMap[iconImage].active : iconMap[iconImage].default
            }
            width={30}
            height={30}
            alt="icon"
          />
          {isSidebarOpen ? (
            <p className={isActive ? "text-[#1976e5]" : ""}>{innerText}</p>
          ) : (
            <p className={`hidden ${isActive ? "text-[#1976e5]" : ""}`}>
              {innerText}
            </p>
          )}
          <Image
            className="absolute right-0"
            src={isActive ? upArrowWhite : downArrowBlack}
            width={36}
            height={36}
            alt="down-arrow"
          />
        </div>
      </Link>

      {/* depth 메뉴 */}
      {isActive && hrefDepth?.length > 0 && (
        <div className="w-full">
          {hrefDepth.map((depthHref, index) => (
            <Link key={index} href={depthHref}>
              <div
                className={`flex items-center h-[34px] mb-2.5 hover:bg-[#F1F0F1] ${
                  router.pathname === depthHref ? "text-[#1976e5]" : ""
                }`}
              >
                {innerTextDepth[index]}{" "}
                {/* innerTextDepth 배열의 해당 텍스트를 표시 */}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
