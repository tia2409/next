import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/component/Header";
import Sidebar from "@/component/Sidebar";
import Tabs from "@/component/Tabs";
import { I18nextProvider } from "react-i18next";
import i18n from "../locales/i18n";
import PopUp from "@/component/PopUp";
import Modal from "@/component/Modal";

function App({ Component, pageProps }) {
  const router = useRouter();
  const currentPath = router.pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 사이드바 상태
  const [title, setTitle] = useState("");
  const [isPopUpOpen, setIsPopUpOpen] = useState(false); // 팝업 상태
  const [popUpData, setPopUpData] = useState(null); // 팝업 데이터 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [modalData, setModalData] = useState(null); // 모달 데이터 상태
  const [modalDataType, setModalDataType] = useState("alert"); // 모달 타입 상태
  const isLoginPage = router.pathname === "/";

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const togglePopUp = (data = null) => {
    setIsPopUpOpen((prev) => !prev);
    setPopUpData(data); // 전달된 데이터를 상태로 설정
  };

  const toggleModal = (data = null, modalType = "alert") => {
    setIsModalOpen((prev) => !prev);
    setModalData(data); // 전달된 데이터를 상태로 설정
    setModalDataType(modalType);
  };

  useEffect(() => {
    const storedLocale = localStorage.getItem("selectedLocale");
    const handleRouteChangeComplete = () => {
      const element = document.querySelector(`a[href='${currentPath}'] > div`);

      if (element) {
        setTitle(element.innerText);
      } else if (!element && currentPath == "/main") {
        setTitle("Main");
      } else {
        setTitle("No Title Found");
      }
    };

    // router.events.on("routeChangeComplete", handleRouteChangeComplete);

    // 경로가 바뀔 때마다 현재 페이지의 제목을 업데이트
    handleRouteChangeComplete();
    // 로컬에 언어선택 정보가 있는지 확인
    if (storedLocale) {
      i18n.changeLanguage(storedLocale);
    }
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [currentPath]);

  // pageProps에 togglePopUp, toggleModal 추가
  const updatedPageProps = {
    ...pageProps,
    togglePopUp,
    toggleModal,
  };

  return (
    <I18nextProvider i18n={i18n}>
      {isLoginPage ? (
        <Component {...pageProps} />
      ) : (
        <div className="notoSansKR.className">
          <Header />
          <div className="relative flex">
            <Sidebar
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            />
            <div className="w-full h-[100vh - 72px]">
              <Tabs />
              <div className="w-[calc(100%-20px)] m-[10px] h-[calc(100vh-114px)] bg-white py-[20px] px-[40px] mt-0 mb-0 main-layer">
                <div className="main-title">{title}</div>
                <div className="main-body">
                  <Component {...updatedPageProps} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* PopUp 포탈 */}
      <PopUp
        togglePopUp={togglePopUp}
        isPopUpOpen={isPopUpOpen}
        data={popUpData}
      />
      {/* Modal 포탈 */}
      <Modal
        toggleModal={toggleModal}
        isModalOpen={isModalOpen}
        data={modalData}
        modalType={modalDataType}
      />
    </I18nextProvider>
  );
}

export default App;
