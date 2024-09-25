import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Tab from "../Tab";

export default function Tabs() {
  const router = useRouter();
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  // URL에 맞춰 탭을 추가하고 활성화 상태 관리
  useEffect(() => {
    const currentPath = router.pathname;
    const existingTabIndex = tabs.findIndex((tab) => tab.path === currentPath);

    // 현재 경로에 해당하는 탭이 없으면 새 탭을 추가
    if (existingTabIndex === -1) {
      const newTab = {
        label: document.querySelector(`a[href='${currentPath}'] > div`)
          .innerText,
        path: currentPath,
      };
      setTabs((prevTabs) => [...prevTabs, newTab]);
      setActiveTab(tabs.length); // 새 탭을 추가하면서 그 탭을 활성화
    } else {
      setActiveTab(existingTabIndex); // 이미 존재하는 탭이면 해당 탭을 활성화
    }
  }, [router.pathname]); // URL이 변경될 때마다 실행

  const handleTabClick = (index, path) => {
    setActiveTab(index);
    router.push(path); // 탭 클릭 시 해당 경로로 이동
  };
  const handleTabDelete = (index) => {
    sessionStorage.removeItem(tabs[index].path);
    const inputs = document.querySelectorAll("input, select");

    inputs.forEach((input) => {
      input.value = "";
    });
    const updatedTabs = tabs.filter((_, i) => i !== index); // 탭 제거
    setTabs(updatedTabs);
    if (updatedTabs.length === 0) {
      // 탭이 모두 삭제되면 /main으로 이동하고 기본 탭 추가
      const mainTab = {
<<<<<<< HEAD
        label: document.querySelector(`a[href="/main"] > div `).innerText,
=======
        label: document.querySelector(`a[href="/main"] > div`).innerText,
>>>>>>> 8d472c94fc0b96fe0314ddd2d51c3798aed79840
        path: "/main",
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
