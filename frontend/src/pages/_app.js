import "@/styles/globals.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Noto_Sans_KR } from "next/font/google";
import Header from "@/component/Header";
import Sidebar from "@/component/Sidebar";
import Tabs from "@/component/Tabs";

// 폰트 설정
const notoSansKR = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

function App({ Component, pageProps }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const isLoginPage = router.pathname === "/"; // 로그인 페이지 여부 확인

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false); // 애니메이션 시작
      setTimeout(() => {
        setIsSidebarVisible(false); // 애니메이션 후 DOM에서 제거
      }, 500); // 애니메이션 시간이 끝난 후
    } else {
      setIsSidebarVisible(true); // DOM에 다시 추가
      setIsSidebarOpen(true); // 애니메이션 시작
    }
  };
  return (
    <>
      {isLoginPage ? (
        <Component {...pageProps} />
      ) : (
        <div className={`notoSansKR.className `}>
          <Header toggleSidebar={toggleSidebar} />
          <div className="flex">
            {isSidebarVisible && <Sidebar isOpen={isSidebarOpen} />}
            <div className="w-full">
              <Tabs />
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
