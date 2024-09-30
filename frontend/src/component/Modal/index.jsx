import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import useOutSideClick from "../hooks/useOutSideClick";

// component
import BasicButton from "../BasicButton";

export default function Modal({ isModalOpen, toggleModal, data, modalType }) {
  if (!isModalOpen) return null; // 팝업이 열리지 않으면 null 반환
  const { t } = useTranslation(); // 다국어 설정
  let isModalType = modalType || "alert";
  let isCaution = !!data.caution;

  const modalRef = useRef(null); // useOutSideClick이 실행되지 않을 영역 지정

  useOutSideClick(modalRef, () => toggleModal(null)); // useOutSideClick custom hook

  return ReactDOM.createPortal(
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
      <div
        ref={modalRef}
        className="relative w-[330px] p-[15px] pt-5 bg-white rounded-[8px]"
        style={{ boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.32)" }}
      >
        {/* Modal header */}
        <div className="flex justify-center pb-3 text-[15px] font-medium">
          {data.title || "title"}
        </div>
        {/* Modal body */}
        <div className="flex justify-center pb-3 font-medium">
          {data.content || "No content provided."}
        </div>
        {/* Modal Caution */}
        {isCaution && (
          <div className="flex justify-center py-3 text-gray03 text-[13px] font-medium border-t border-t-gray06">
            {data.caution}
          </div>
        )}
        {/* Modal footer */}
        <div className="flex items-center justify-center gap-2 pt-3">
          {isModalType === "alert" && (
            <BasicButton
              width="300"
              innerText={t("common.check")}
              onClick={() => toggleModal(null)}
            />
          )}
          {isModalType === "confirm" && (
            <>
              <BasicButton
                width="150"
                border={true}
                innerText={t("common.close")}
                onClick={() => toggleModal(null)}
              />
              <BasicButton width="150" innerText={t("common.check")} />
            </>
          )}
        </div>
      </div>
    </div>,
    document.body // 팝업을 body 요소에 포탈로 렌더링
  );
}
