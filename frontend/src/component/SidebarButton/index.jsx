import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import IconMdc from "./../../../public/images/icons/sidebar_mdc.svg";
import IconMdcActive from "./../../../public/images/icons/sidebar_mdc_active.svg";
import IconTool from "./../../../public/images/icons/sidebar_tool.svg";
import IconToolActive from "./../../../public/images/icons/sidebar_tool_active.svg";
import IconAdmin from "./../../../public/images/icons/sidebar_admin.svg";
import IconAdminActive from "./../../../public/images/icons/sidebar_admin_active.svg";

// 이미지 매핑
const iconMap = {
    IconMdc: { default: IconMdc, active: IconMdcActive },
    IconTool: { default: IconTool, active: IconToolActive },
    IconAdmin: { default: IconAdmin, active: IconAdminActive },
};
  

  export default function SidebarButton({ iconImage, href, innerText, isSidebarOpen, isActive }) {
    return (
      <Link href={href}>
        <div className="w-full h-[44px] leading-[44px] flex items-center space-x-2 overflow-hidden">
          <Image src={isActive ? iconMap[iconImage].active : iconMap[iconImage].default} width={30} height={30} alt="icon" />
          {isSidebarOpen && <p className={`pl-1 ${isActive ? 'text-[#1976e5]' : ''}`}>{innerText}</p>}
        </div>
      </Link>
    );
  }