import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// depth arrow
import downArrowBlack from "./../../../public/images/icons/arrow/down-black.svg";
import upArrowWhite from "./../../../public/images/icons/arrow/up-white.svg";
import rightArrowBlack from "./../../../public/images/icons/arrow/right-black.svg";
import rightArrowBlue from "./../../../public/images/icons/arrow/right-blue.svg";

export default function SidebarButton({
  menu_nm,
  img_src,
  isSidebarOpen,
  isDropMenu,
  isActive,
  menuDepth,
  hrefDepth,
}) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(isDropMenu);
  const [isHovered, setIsHovered] = useState(false);
  const currentPath = router.pathname;
  useEffect(() => {
    if (isActive) {
      sessionStorage.setItem(
        "pageDepth",
        JSON.stringify({
          depth1: menu_nm,
          depth2: menuDepth[hrefDepth.indexOf(router.pathname)],
        })
      );
    }
  }, [currentPath]);

  // 버튼 클릭 시 펼치기/접기 토글
  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={handleToggle}
        className={`
          ${isActive ? "border-main02" : "border-gray05"} 
          ${isActive && isSidebarOpen ? "bg-main04" : ""}
          ${
            isSidebarOpen
              ? "hover:bg-gray06"
              : "border-none bg-none justify-center"
          }
          relative w-full h-[44px] leading-[44px] flex items-center space-x-2 mb-2.5 
          overflow-hidden border rounded-[3px] cursor-pointer`}
      >
        <Image
          src={
            isActive || isHovered ? `${img_src}-active.svg` : `${img_src}.svg`
          }
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          width={36}
          height={36}
          alt="icon"
        />
        {isSidebarOpen ? (
          <p className={isActive ? "text-main02" : ""}>{menu_nm}</p>
        ) : (
          <p className={`hidden ${isActive ? "text-main02" : ""}`}>{menu_nm}</p>
        )}
        {isSidebarOpen && (
          <Image
            className="absolute right-0"
            src={isExpanded ? upArrowWhite : downArrowBlack}
            width={36}
            height={36}
            alt="arrow"
          />
        )}
      </div>

      {/* depth 메뉴 - isExpanded가 true일 때 표시 */}
      {isExpanded && isSidebarOpen && hrefDepth?.length > 0 && (
        <div className="w-full depth">
          {hrefDepth.map((depthHref, index) => (
            <Link
              key={index}
              href={depthHref}
              className={`flex mb-2.5 hover:bg-gray06 ${
                router.pathname === depthHref ? "bg-main04" : ""
              }`}
            >
              <Image
                src={
                  router.pathname === depthHref
                    ? rightArrowBlue
                    : rightArrowBlack
                }
                width={36}
                height={34}
                alt="right-arrow"
              />
              <div
                className={`flex items-center h-[34px] ${
                  router.pathname === depthHref ? "text-main02" : ""
                }`}
              >
                {menuDepth[index]}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
