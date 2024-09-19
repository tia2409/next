import React from "react";
import styles from "./index.module.css";
import Link from "next/link";
import MenuIcon from "./../../../public/images/icons/sidebar_menu.svg";
import Image from "next/image";

export default function Sidebar({ toggleSidebar }) {
  return (
    <div
      className={`w-[300px] h-[calc(100vh-72px)] px-[10px] py-[20px] bg-[#121212] ${
        toggleSidebar ? styles.sidebarEnter : styles.sidebarExit
      }`}
    >
      <div className="flex justify-end items-center w-full h-[44px] leading-[44px]">
        <Image src={MenuIcon} alt="Menu Icon" onClick={toggleSidebar} />
      </div>
      <div className="w-full h-[44px] leading-[44px] overflow-hidden">
        <Link href={"/main"}>main</Link>
      </div>
      <div className="w-full h-[44px] leading-[44px] overflow-hidden">
        <Link href={"/test"}>test</Link>
      </div>
      <div className="w-full h-[44px] leading-[44px] overflow-hidden">
        <Link href={"/test1"}>test1</Link>
      </div>
    </div>
  );
}
