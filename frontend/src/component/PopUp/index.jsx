import React from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { useTranslation } from "react-i18next";

// component
import BasicButton from "../BasicButton";
// image
import IconClose from "./../../../public/images/icons/popup-close.svg";

export default function PopUp({ isPopUpOpen, togglePopUp, data }) {
  if (!isPopUpOpen) return null; // 팝업이 열리지 않으면 null 반환
  const { t } = useTranslation();

  return ReactDOM.createPortal(
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="relative w-[870px] h-[723px] p-5 border border-gray02 bg-white rounded-xl">
        <div className="flex justify-between items-center w-full h-[43px] py-[10px] border-b border-b-gray05">
          {/* PopUp header */}
          <div className="text-[16px] font-medium">{data.title || "title"}</div>
          <Image
            className="h-[44px] cursor-pointer"
            src={IconClose}
            width={44}
            height={44}
            alt="close"
            onClick={() => togglePopUp(null)}
          />
        </div>
        {/* PopUp body */}
        <div className="p-5">
          <p>{data.content || "No content provided."}</p>
        </div>
        {/* PopUp footer */}
        <div className="absolute left-[50%] bottom-[20px] flex gap-2 transform -translate-x-1/2 ">
            <BasicButton border="border border-main02" text="text-main02" background="bg-white hover:bg-main04" innerText={t("common.cancel")} onClick={() => togglePopUp(null)}/>
            <BasicButton text="text-white" background="bg-main02 hover:bg-main01" innerText={t("common.save")}/>
        </div>
      </div>
    </div>,
    document.body // 팝업을 body 요소에 포탈로 렌더링
  );
}