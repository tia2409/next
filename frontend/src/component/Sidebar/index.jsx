import React, { useState } from "react";
import styles from "./index.module.css";
import Link from "next/link";
import MenuIcon from "./../../../public/images/icons/sidebar_menu.svg";
import Image from "next/image";
import SidebarButton from "../SidebarButton";
import { useRouter } from 'next/router';

export default function Sidebar({ toggleSidebar, isSidebarOpen }) {
  const router = useRouter(); // useRouter 훅 사용

  return (
    <div
      className={`h-[calc(100vh-72px)] px-[10px] py-[20px] bg-[#121212] ${
        isSidebarOpen ? styles.sidebarEnter : styles.sidebarExit
      }`}
    >
      <div className="flex justify-end items-center w-full h-[44px] leading-[44px]">
        <Image src={MenuIcon} alt="Menu Icon" onClick={toggleSidebar} />
      </div>
      <SidebarButton
        iconImage="iconMdc"
        href="/main"
        innerText="iconMdc"
        isSidebarOpen={isSidebarOpen}
        isActive={router.pathname === '/main'}
      />
      <SidebarButton
        iconImage="iconTool"
        href="/test"
        innerText="iconTool"
        isSidebarOpen={isSidebarOpen}
        isActive={router.pathname === '/test'}
      />
      <SidebarButton
        iconImage="iconAdmin"
        href="/test1"
        innerText="iconAdmin"
        isSidebarOpen={isSidebarOpen}
        isActive={router.pathname === '/test1'}
      />
    </div>
  );
}
