import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// 메뉴 아이콘
import iconAlarmHistory from "./../../../public/images/icons/menu-alarm-history.svg";
import iconAlarmHistoryActive from "./../../../public/images/icons/menu-alarm-history-active.svg";
import iconAsset from "./../../../public/images/icons/menu-asset.svg";
import iconAssetActive from "./../../../public/images/icons/menu-asset-active.svg";
import iconBlueprint from "./../../../public/images/icons/menu-blueprint.svg";
import iconBlueprintActive from "./../../../public/images/icons/menu-blueprint-active.svg";
import iconChangeHistory from "./../../../public/images/icons/menu-change-history.svg";
import iconChangeHistoryActive from "./../../../public/images/icons/menu-change-history-active.svg";
import iconChart from "./../../../public/images/icons/menu-chart.svg";
import iconChartActive from "./../../../public/images/icons/menu-chart-active.svg";
import iconControlHistory from "./../../../public/images/icons/menu-control-history.svg";
import iconControlHistoryActive from "./../../../public/images/icons/menu-control-history-active.svg";
import iconEquipment from "./../../../public/images/icons/menu-equipment.svg";
import iconEquipmentActive from "./../../../public/images/icons/menu-equipment-active.svg";
import iconFactory from "./../../../public/images/icons/menu-factory.svg";
import iconFactoryActive from "./../../../public/images/icons/menu-factory-active.svg";
import iconLogInquiry from "./../../../public/images/icons/menu-log-inquiry.svg";
import iconLogInquiryActive from "./../../../public/images/icons/menu-log-inquiry-active.svg";
import iconOffice from "./../../../public/images/icons/menu-office.svg";
import iconOfficeActive from "./../../../public/images/icons/menu-office-active.svg";
import iconProduce from "./../../../public/images/icons/menu-produce.svg";
import iconProduceActive from "./../../../public/images/icons/menu-produce-active.svg";
import iconQuality from "./../../../public/images/icons/menu-quality.svg";
import iconQualityActive from "./../../../public/images/icons/menu-quality-active.svg";
import iconTotal from "./../../../public/images/icons/menu-total.svg";
import iconTotalActive from "./../../../public/images/icons/menu-total-active.svg";
import iconTotalBI from "./../../../public/images/icons/menu-total-b-i.svg";
import iconTotalBIActive from "./../../../public/images/icons/menu-total-b-i-active.svg";
import iconUserManagement from "./../../../public/images/icons/menu-user-management.svg";
import iconUserManagementActive from "./../../../public/images/icons/menu-user-management-active.svg";

// depth arrow
import downArrowBlack from "./../../../public/images/icons/down-arrow-black.svg";
import upArrowWhite from "./../../../public/images/icons/up-arrow-white.svg";
import rightArrowBlack from "./../../../public/images/icons/right-arrow-black.svg";
import rightArrowBlue from "./../../../public/images/icons/right-arrow-blue.svg";


// 이미지 매핑
const iconMap = {
  iconAlarmHistory: { default: iconAlarmHistory, active: iconAlarmHistoryActive },
  iconAsset: { default: iconAsset, active: iconAssetActive },
  iconBlueprint: { default: iconBlueprint, active: iconBlueprintActive },
  iconChangeHistory: { default: iconChangeHistory, active: iconChangeHistoryActive },
  iconChart: { default: iconChart, active: iconChartActive },
  iconControlHistory: { default: iconControlHistory, active: iconControlHistoryActive },
  iconEquipment: { default: iconEquipment, active: iconEquipmentActive },
  iconFactory: { default: iconFactory, active: iconFactoryActive },
  iconLogInquiry: { default: iconLogInquiry, active: iconLogInquiryActive },
  iconOffice: { default: iconOffice, active: iconOfficeActive },
  iconProduce: { default: iconProduce, active: iconProduceActive },
  iconQuality: { default: iconQuality, active: iconQualityActive },
  iconTotal: { default: iconTotal, active: iconTotalActive },
  iconTotalBI: { default: iconTotalBI, active: iconTotalBIActive },
  iconUserManagement: { default: iconUserManagement, active: iconUserManagementActive },
};

export default function SidebarButton({
  menu,
  isSidebarOpen,
  isDropMenu,
  isActive,
  hrefDepth,
  menuDepth,
}) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(isDropMenu);
  const [isHovered, setIsHovered] = useState(false);

  // 버튼 클릭 시 펼치기/접기 토글
  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      "&:hover": { // hover
        backgroundColor: "#c9c9c9",
        color: "#ffffff",
      },
    }),
  };

  return (
    <>
      <div
        onClick={handleToggle}
        className={`
          ${isActive ? "border-[#1976e5]" : "border-[#cfcdcd]"} 
          ${isActive && isSidebarOpen ? "bg-[#E4F2FE]" : ""}
          ${isSidebarOpen ? "hover:bg-[#F1F0F1]" : "border-none bg-none justify-center"}
          relative w-full h-[44px] leading-[44px] flex items-center space-x-2 mb-2.5 
          overflow-hidden border rounded-[3px] cursor-pointer`}
      >
        <Image
          src={
            isActive || isHovered ? iconMap[menu].active : iconMap[menu].default
          }
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          width={36}
          height={36}
          alt="icon"
        />
        {isSidebarOpen ? (
          <p className={isActive ? "text-[#1976e5]" : ""}>{menu}</p>
        ) : (
          <p className={`hidden ${isActive ? "text-[#1976e5]" : ""}`}>
            {menu}
          </p>
        )}
        {isSidebarOpen &&
          <Image
            className="absolute right-0"
            src={isExpanded ? upArrowWhite : downArrowBlack}
            width={36}
            height={36}
            alt="arrow"
          />
        }
      </div>

      {/* depth 메뉴 - isExpanded가 true일 때 표시 */}
      {isExpanded && isSidebarOpen && hrefDepth?.length > 0 && (
        <div className="w-full depth">
          {hrefDepth.map((depthHref, index) => (
            <Link
              key={index}
              href={depthHref}
              className={`flex mb-2.5 hover:bg-[#F1F0F1] ${
                router.pathname === depthHref ? "bg-[#E2F0FC]" : ""
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
                  router.pathname === depthHref ? "text-[#1976e5]" : ""
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
