import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import styles from "./index.module.css";
import Tab from "../Tab";

export default function Tabs() {
  const router = useRouter();
  const currentPath = router.pathname;
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [depth, setDepth] = useState(); // 모달 타입 상태

  useEffect(() => {
    const existingTabIndex = tabs.findIndex((tab) => tab.path === currentPath);
    const storedLocale = localStorage.getItem("selectedLocale");

    const searchPath = async () => {
      try {
        const res = await axios.post(
          "/MenuPath",
          { path: currentPath },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const depth2 = "depth2_" + storedLocale.slice(0, 2);
        setDepth(res.data[0][depth2]);

        // axios 요청이 끝난 후에 탭을 추가하거나 활성화 처리
        if (existingTabIndex === -1) {
          const newTab = {
            label: res.data[0][depth2] || "undefined",
            path: currentPath,
          };
          setTabs((prevTabs) => [...prevTabs, newTab]);
          setActiveTab(tabs.length); // 새 탭을 추가하면서 그 탭을 활성화
        } else {
          setActiveTab(existingTabIndex); // 이미 존재하는 탭이면 해당 탭을 활성화
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    searchPath();
  }, [router.pathname]);

  const handleTabClick = (index, path) => {
    setActiveTab(index);
    router.push(path); // 탭 클릭 시 해당 경로로 이동
  };
  const handleTabDelete = (index) => {
    sessionStorage.removeItem(tabs[index].path);
    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
      input.value = "";
    });
    const updatedTabs = tabs.filter((_, i) => i !== index); // 탭 제거
    setTabs(updatedTabs);
    if (updatedTabs.length === 0) {
      // 탭이 모두 삭제되면 /main으로 이동하고 기본 탭 추가
      const mainTab = {
        label: depth,
        path: currentPath,
      };
      setTabs([mainTab]);
      router.push("/main");
    } else {
      router.push(updatedTabs[0].path);
    }
    setActiveTab(0);
  };

  return (
    <div className={`${styles.tabsContainer} bg-[#f5f5f5]`}>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          isActive={activeTab === index}
          onClick={() => handleTabClick(index, tab.path)}
          onDelete={() => handleTabDelete(index)}
        />
      ))}
    </div>
  );
}
