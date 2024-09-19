import "@/styles/globals.css";
import { useRouter } from "next/router";
import { Noto_Sans_KR } from "next/font/google";
import { appWithTranslation } from "next-i18next";
import Header from "@/component/Header";
import Sidebar from "@/component/Sidebar";
import { useState } from "react";

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
    <div className={notoSansKR.className}>
      {router.pathname !== "/" && <Header toggleSidebar={toggleSidebar} />}
      <div className="flex">
        {router.pathname !== "/" && isSidebarVisible && (
          <Sidebar isOpen={isSidebarOpen} />
        )}
        <Component {...pageProps} />
      </div>
    </div>
  );
}

// export default appWithTranslation(App);
export default App;
