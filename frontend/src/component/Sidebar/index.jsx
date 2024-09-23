import React, { useState } from "react";
import styles from "./index.module.css";
import MenuIcon from "./../../../public/images/icons/sidebar_menu.svg";
import Image from "next/image";
import SidebarButton from "../SidebarButton";
import { useRouter } from 'next/router';

export default function Sidebar({ toggleSidebar, isSidebarOpen }) {
  const router = useRouter(); // useRouter 훅 사용

  return (
    <div
      className={`h-[calc(100vh-72px)] p-[10px] bg-white ${
        isSidebarOpen ? styles.sidebarEnter : styles.sidebarExit
      }`}
    >
      <div className="flex justify-end items-center w-full h-[36px] mb-2.5">
        <Image className="cursor-pointer" src={MenuIcon} alt="Menu Icon" onClick={toggleSidebar} />
      </div>
      <SidebarButton
        iconImage="iconMdc"
        href="/main"
        innerText="iconMdc"
        isSidebarOpen={isSidebarOpen}
        isActive={['/main', '/test', '/test1'].includes(router.pathname)} // 배열에 현재 경로가 포함되는지 확인
        innerTextDepth={['icon Main', 'icon', 'icon1']}
        hrefDepth={['/main', '/test', '/test1']}
      />
      <SidebarButton
        iconImage="iconTool"
        href="/test"
        innerText="iconTool"
        isSidebarOpen={isSidebarOpen}
        isActive={['/test2', '/test3'].includes(router.pathname)} // 배열에 현재 경로가 포함되는지 확인
        innerTextDepth={['icon2', 'icon3']}
        hrefDepth={['/test2', '/test3']}
      />
      <SidebarButton
        iconImage="iconAdmin"
        href="/test1"
        innerText="iconAdmin"
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
}
