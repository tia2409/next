import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import iconMdc from "./../../../public/images/icons/sidebar_mdc.svg";
import iconMdcActive from "./../../../public/images/icons/sidebar_mdc_active.svg";
import iconTool from "./../../../public/images/icons/sidebar_tool.svg";
import iconToolActive from "./../../../public/images/icons/sidebar_tool_active.svg";
import iconAdmin from "./../../../public/images/icons/sidebar_admin.svg";
import iconAdminActive from "./../../../public/images/icons/sidebar_admin_active.svg";

// 이미지 매핑
const iconMap = {
    iconMdc: { default: iconMdc, active: iconMdcActive },
    iconTool: { default: iconTool, active: iconToolActive },
    iconAdmin: { default: iconAdmin, active: iconAdminActive },
};
  

  export default function SidebarButton({ iconImage, href, innerText, isSidebarOpen, isActive }) {
    return (
      <Link href={href}>
        <div className="w-full h-[44px] leading-[44px] flex items-center space-x-2 overflow-hidden">
          <Image src={isActive ? iconMap[iconImage].active : iconMap[iconImage].default} width={30} height={30} alt="icon" />
          {isSidebarOpen ? (<p className={`pl-1 ${isActive ? 'text-[#1976e5]' : ''}`}>{innerText}</p>) : (<p className={`pl-1 hidden ${isActive ? 'text-[#1976e5]' : ''}`}>{innerText}</p>)}
        </div>
      </Link>
    );
  }