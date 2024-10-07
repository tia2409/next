import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import styles from "./index.module.css";

// image
import MenuOpen from "./../../../../public/images/icons/arrow/left_double_black.svg";
import MenuClose from "./../../../../public/images/icons/arrow/right_double_black.svg";

// component
import SidebarButton from "../SidebarButton";

export default function Sidebar({ toggleSidebar, isSidebarOpen }) {
  const router = useRouter();
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchMenuList = () => {
      axios
        .post("/MenuList", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          setResult(Object.entries(response.data));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchMenuList();
  }, []);

  return (
    <div
      className={`h-[calc(100vh-72px)] p-[10px] bg-white overflow-y-scroll ${
        styles.sidebar
      } ${isSidebarOpen ? styles.sidebarEnter : styles.sidebarExit}`}
    >
      <div
        className={`flex items-center w-full h-[36px] mb-2.5 ${
          isSidebarOpen ? "justify-end" : "justify-center"
        }`}
      >
        <Image
          className="cursor-pointer"
          src={isSidebarOpen ? MenuOpen : MenuClose}
          alt="Menu Icon"
          onClick={toggleSidebar}
        />
      </div>
      {result.map((menu) => {
        let subMenu_nm = [];
        let subMenu_url = [];

        if (menu[1].sub_menu) {
          let subMenu = menu[1].sub_menu;

          subMenu.forEach((sub) => {
            subMenu_nm.push(sub.title_ko);
            subMenu_url.push(sub.link_id);
          });
        }

        if (menu[1].menu_level === 1) {
          return (
            <SidebarButton
              key={menu[1].menu_id}
              menu_nm={menu[1].title_ko}
              img_src={menu[1].img_src}
              isSidebarOpen={isSidebarOpen}
              isDropMenu={subMenu_url.includes(router.pathname)}
              isActive={subMenu_url.includes(router.pathname)} // 배열에 현재 경로가 포함되는지 확인
              menuDepth={subMenu_nm}
              hrefDepth={subMenu_url}
            />
          );
        }
      })}
    </div>
  );
}
