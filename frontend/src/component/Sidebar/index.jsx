import React from "react";
import styles from "./index.module.css";
import Link from "next/link";

export default function Sidebar({ isOpen }) {
  return (
    <div
      className={`${
        styles.sidebar
      } w-[300px] h-[calc(100vh-72px)] px-[10px] py-[20px] bg-[#121212] ${
        isOpen ? styles.sidebarEnter : styles.sidebarExit
      }`}
    >
      <div className="w-full h-[44px] leading-[44px]">
        <Link href={"/main"}>main</Link>
      </div>
      <div className="w-full h-[44px] leading-[44px]">
        <Link href={"/test"}>test</Link>
      </div>
      <div className="w-full h-[44px] leading-[44px]">
        <Link href={"/test1"}>test1</Link>
      </div>
    </div>
  );
}
