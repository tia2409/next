import React, { useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import SidebarButton from "../SidebarButton";
<<<<<<< HEAD
import { useRouter } from "next/router";
=======
import { useRouter } from 'next/router';
import MenuOpen from "./../../../public/images/icons/arrow/left-double-black.svg";
import MenuClose from "./../../../public/images/icons/arrow/right-double-black.svg";
>>>>>>> 8d472c94fc0b96fe0314ddd2d51c3798aed79840

export default function Sidebar({ toggleSidebar, isSidebarOpen }) {
  const router = useRouter(); // useRouter 훅 사용

  return (
    <div
<<<<<<< HEAD
      className={`min-h-[calc(100vh-72px)] h-auto p-[10px] bg-white ${
        styles.sidebar
      } ${isSidebarOpen ? styles.sidebarEnter : styles.sidebarExit}`}
    >
      <div className="flex justify-end items-center w-full h-[36px] mb-2.5">
        <Image
          className="cursor-pointer"
          src={MenuIcon}
          alt="Menu Icon"
          onClick={toggleSidebar}
        />
=======
      className={`h-[calc(100vh-72px)] p-[10px] bg-white overflow-y-scroll ${styles.sidebar} ${
        isSidebarOpen ? styles.sidebarEnter : styles.sidebarExit
      }`}
    >
      <div className={`flex items-center w-full h-[36px] mb-2.5 ${isSidebarOpen ? "justify-end" : "justify-center"}`}>
        <Image className="cursor-pointer" src={isSidebarOpen ? MenuOpen : MenuClose} alt="Menu Icon" onClick={toggleSidebar} />
>>>>>>> 8d472c94fc0b96fe0314ddd2d51c3798aed79840
      </div>
      <SidebarButton
        menu="iconTotal"
        isSidebarOpen={isSidebarOpen}
        isDropMenu={["/main", "/test", "/test1"].includes(router.pathname)}
        isActive={["/main", "/test", "/test1"].includes(router.pathname)} // 배열에 현재 경로가 포함되는지 확인
        menuDepth={["icon Main", "icon", "icon1"]}
        hrefDepth={["/main", "/test", "/test1"]}
      />
      <SidebarButton
        menu="iconAlarmHistory"
        isSidebarOpen={isSidebarOpen}
<<<<<<< HEAD
        isDropMenu={["/test2", "/test3"].includes(router.pathname)}
        isActive={["/test2", "/test3"].includes(router.pathname)} // 배열에 현재 경로가 포함되는지 확인
        menuDepth={["icon2", "icon3"]}
        hrefDepth={["/test2", "/test3"]}
=======
        isDropMenu={['/test2', '/test3'].includes(router.pathname)}
        isActive={['/test2', '/test3'].includes(router.pathname)} // 배열에 현재 경로가 포함되는지 확인
        menuDepth={['icon2', 'icon3']}
        hrefDepth={['/test2', '/test3']}
      />
      <SidebarButton
        menu="iconAsset"
        isSidebarOpen={isSidebarOpen}
      />
      <SidebarButton
        menu="iconBlueprint"
        isSidebarOpen={isSidebarOpen}
      />
      <SidebarButton
        menu="iconChangeHistory"
        isSidebarOpen={isSidebarOpen}
      />
      <SidebarButton
        menu="iconChart"
        isSidebarOpen={isSidebarOpen}
      />
      <SidebarButton
        menu="iconControlHistory"
        isSidebarOpen={isSidebarOpen}
      />
      <SidebarButton
        menu="iconEquipment"
        isSidebarOpen={isSidebarOpen}
      />
      <SidebarButton
        menu="iconFactory"
        isSidebarOpen={isSidebarOpen}
      />
      <SidebarButton
        menu="iconLogInquiry"
        isSidebarOpen={isSidebarOpen}
      />
      <SidebarButton
        menu="iconOffice"
        isSidebarOpen={isSidebarOpen}
      />
      <SidebarButton
        menu="iconProduce"
        isSidebarOpen={isSidebarOpen}
      />
      <SidebarButton
        menu="iconQuality"
        isSidebarOpen={isSidebarOpen}
      />
      <SidebarButton
        menu="iconUserManagement"
        isSidebarOpen={isSidebarOpen}
>>>>>>> 8d472c94fc0b96fe0314ddd2d51c3798aed79840
      />
      <SidebarButton menu="iconAsset" isSidebarOpen={isSidebarOpen} />
      <SidebarButton menu="iconBlueprint" isSidebarOpen={isSidebarOpen} />
      <SidebarButton menu="iconChangeHistory" isSidebarOpen={isSidebarOpen} />
      <SidebarButton menu="iconChart" isSidebarOpen={isSidebarOpen} />
      <SidebarButton menu="iconControlHistory" isSidebarOpen={isSidebarOpen} />
      <SidebarButton menu="iconEquipment" isSidebarOpen={isSidebarOpen} />
      <SidebarButton menu="iconFactory" isSidebarOpen={isSidebarOpen} />
      <SidebarButton menu="iconLogInquiry" isSidebarOpen={isSidebarOpen} />
      <SidebarButton menu="iconUserManagement" isSidebarOpen={isSidebarOpen} />
      <SidebarButton menu="iconUserManagement" isSidebarOpen={isSidebarOpen} />
      <SidebarButton menu="iconUserManagement" isSidebarOpen={isSidebarOpen} />
    </div>
  );
}
