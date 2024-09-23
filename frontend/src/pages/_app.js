import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Noto_Sans_KR } from "next/font/google";
import Header from "@/component/Header";
import Sidebar from "@/component/Sidebar";
import Tabs from "@/component/Tabs";
import { I18nextProvider } from "react-i18next";
import i18n from "../locales/i18n";

// 폰트 설정
const notoSansKR = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

function App({ Component, pageProps }) {
  const router = useRouter();
  const currentPath = router.pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [title, setTitle] = useState("");
  const isLoginPage = router.pathname === "/"; // 로그인 페이지 여부 확인

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  useEffect(() => {
    const handleRouteChangeComplete = () => {
      const element = document.querySelector(
        `a[href='${currentPath}'] > div > p`
      );

      console.log("Current Path:", currentPath);

      if (element) {
        setTitle(element.innerText);
      } else {
        setTitle("No Title Found");
      }
      console.log("Title: ", element ? element.innerText : "Not found");
    };

    // router.events.on("routeChangeComplete", handleRouteChangeComplete);

    // 경로가 바뀔 때마다 현재 페이지의 제목을 업데이트
    handleRouteChangeComplete();

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [currentPath]);

  return (
    <I18nextProvider i18n={i18n}>
      {isLoginPage ? (
        <Component {...pageProps} />
      ) : (
        <div className={`notoSansKR.className`}>
          <Header />
          <div className="relative flex">
            <Sidebar
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            />
            <div className="w-full h-[100vh - 72px]">
              <Tabs />
              <div className="w-[calc(100%-40px)] m-[20px] h-[calc(100vh-133px)] bg-[#fff] p-[20px] mt-0">
                <div className="main-title">{title}</div>
                <div className="main-body">
                  <Component {...pageProps} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </I18nextProvider>
  );
}

export default App;
