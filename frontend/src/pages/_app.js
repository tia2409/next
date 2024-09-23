import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Noto_Sans_KR } from "next/font/google";
import Header from "@/component/Header";
import Sidebar from "@/component/Sidebar";
import Tabs from "@/component/Tabs";
import { I18nextProvider } from "react-i18next";
import i18n from "../locales/i18n";
import Detailbar from "@/component/DetailBar";

// 폰트 설정
const notoSansKR = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

function App({ Component, pageProps }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDetailbarOpen, setIsDetailbarOpen] = useState(false);
  const [title, setTitle] = useState("");
  const isLoginPage = router.pathname === "/"; // 로그인 페이지 여부 확인

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  
  const toggleDetailbar = () => {
    setIsDetailbarOpen((prev) => !prev);
  };

  useEffect(() => {
    const currentPath = router.pathname;
    const storedLocale = localStorage.getItem('selectedLocale');
    console.log(currentPath);
    if (currentPath !== "/") {
      setTitle(document.querySelector(`a[href='${currentPath}']`).innerText);
    }
    // 로컬에 언어선택 정보가 있는지 확인
    if (storedLocale) {
        i18n.changeLanguage(storedLocale);
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <div className={`notoSansKR.className`}>
        {isLoginPage ? (
          <Component {...pageProps} />
        ) : (
          <>
            <Header />
            <div className="relative flex">
              <Sidebar
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
              />
              <div className="w-full h-[100vh - 72px]">
                <Tabs />
                <div className="w-[calc(100%-40px)] m-[20px] h-[calc(100vh-133px)] bg-[#2d2d2d] p-[20px] mt-0">
                  <div className="main-title">{title}</div>
                  <div className="main-body">
                    <Component {...pageProps} toggleDetailbar={toggleDetailbar} />
                  </div>
                </div>
              </div>
              {isDetailbarOpen && (
                <Detailbar toggleDetailbar={toggleDetailbar} isDetailbarOpen={isDetailbarOpen} />
              )}
            </div>
          </>
        )}
      </div>
    </I18nextProvider>
  );
  
  
}

export default App;
