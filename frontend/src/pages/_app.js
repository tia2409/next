import "@/styles/globals.css";
import { useRouter } from "next/router";
import { Noto_Sans_KR } from 'next/font/google';
import { appWithTranslation } from "next-i18next";
import Header from "@/component/Header";
import Sidebar from "@/component/Sidebar";
import { useState } from "react";

// 폰트 설정 
const notoSansKR = Noto_Sans_KR({
  weight: ['400', '500', '700'], 
  subsets: ['latin'], 
  display: 'swap',
});

function App({ Component, pageProps }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={notoSansKR.className}>
      {router.pathname !== "/" && <Header toggleSidebar={toggleSidebar} />}
      <div className="flex">
        {router.pathname !== "/" && isSidebarOpen && <Sidebar isOpen={isSidebarOpen} />}
          <Component {...pageProps} />
      </div>
    </div>
  );
}

// export default appWithTranslation(App);
export default App;