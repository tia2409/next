import React, { useRef } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { useTranslation } from "react-i18next";

// image
import IconClose from "./../../../../public/images/icons/layout/popup_close.svg";

// component
import useOutSideClick from "../../hooks/useOutSideClick";
import BasicButton from "../../Button/BasicButton";

export default function PopUp({ isPopUpOpen, togglePopUp, data }) {
  if (!isPopUpOpen) return null; // 모달이 열리지 않으면 null 반환
  const { t } = useTranslation();

  const PopUpRef = useRef(null); // useOutSideClick이 실행되지 않을 영역 지정

  useOutSideClick(PopUpRef, () => togglePopUp(null)); // useOutSideClick custom hook

  return ReactDOM.createPortal(
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div
        ref={PopUpRef}
        className="relative w-[870px] h-[723px] p-5 pb-[74px] border border-gray02 bg-white rounded-xl"
      >
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
        <div className="h-full pt-5 pb-[43px]">
          <div className="h-full bg-main04">
            {data.content || "No content provided."}
          </div>
        </div>
        {/* PopUp footer */}
        <div className="absolute left-[50%] bottom-[20px] flex gap-2 transform -translate-x-1/2 ">
          <BasicButton
            border={true}
            innerText={t("common.cancel")}
            onClick={() => togglePopUp(null)}
          />
          <BasicButton innerText={t("common.save")} />
        </div>
      </div>
    </div>,
    document.body // 팝업을 body 요소에 포탈로 렌더링
  );
}
