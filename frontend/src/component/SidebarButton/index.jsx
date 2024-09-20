import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import IconMdc from "./../../../public/images/icons/sidebar_mdc.svg";
import IconTool from "./../../../public/images/icons/sidebar_tool.svg";
import IconAdmin from "./../../../public/images/icons/sidebar_admin.svg";

// 이미지 매핑
const iconMap = {
    IconMdc: IconMdc,
    IconTool: IconTool,
    IconAdmin: IconAdmin,
  };
  

export default function SidebarButton({ iconImage, href, innerText, isSidebarOpen }) {
    return (
      <Link href={href}>
        <div className="w-full h-[44px] leading-[44px] flex items-center space-x-2 overflow-hidden">
          <Image src={iconMap[iconImage]} width={30} height={30} alt="icon" />
          {isSidebarOpen && <p className='pl-1'>{innerText}</p>}
        </div>
      </Link>
    );
  }