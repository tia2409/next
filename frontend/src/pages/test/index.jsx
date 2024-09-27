import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // 다국어 처리를 위해 import 하기

import BasicSelect from "@/component/BasicSelect";
import useFormData from "@/component/hooks/useFormData";
import BasicButton from "@/component/BasicButton";
import BasicInput from "@/component/BasicInput";
import IconButton from "@/component/IconButton";

import IconCalendar from "../../../public/images/icons/input/calendar.svg";
import IconPassword from "../../../public/images/icons/input/password.svg";
import IconDelete from "../../../public/images/icons/button/delete.svg";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function Index({ togglePopUp, toggleModal }) {
  useFormData();
  const { t } = useTranslation(); // import한 useTranslation

  return (
    <div className="w-full h-full p-4">
      {/* json파일에서 단일 key: value */}
      <div>{t("test")}</div>
      {/* json파일에서 key: { key : value } 형태 */}
      <div>{t("login.join")}</div>
      <input id="plz2" />
      <BasicSelect
        inputId="test"
        width="360"
        deleteOption={false}
        placeHolder="test"
        options={options}
        defaultValue
        defaultSelectValue={options[0]}
        type="check"
      />
      <BasicSelect
        inputId="test-multi"
        width="360"
        deleteOption={false}
        placeHolder="test"
        options={options}
        defaultValue
        // onchange={(e) => setPerPage(e.value)}
        defaultSelectValue={options[0]}
        type="multi"
      />
      <BasicButton
        width="360px"
        border=""
        text="text-white"
        background="bg-main02"
        round={true}
        innerText="PopUp Open"
        onClick={() => {
          togglePopUp({ title: "팝업 제목", content: "팝업 내용" });
        }}
      />
      <BasicButton
        width="360px"
        border=""
        text="text-white"
        background="bg-main02"
        innerText="Modal Open, alert"
        onClick={() => {
          toggleModal(
            {
              title: "모달 제목",
              content: "모달 내용",
            },
            "alert"
          );
        }}
      />
      <BasicButton
        width="360px"
        border=""
        text="text-white"
        background="bg-main02"
        innerText="Modal Open, confirm"
        onClick={() => {
          toggleModal(
            {
              title: "모달 제목",
              content: "모달 내용",
              caution: "※ 모달 주의사항",
            },
            "confirm"
          );
        }}
      />
      <BasicInput inputId="test_input" placeholder="test_input_placeholder" />
      <BasicInput
        width="360"
        height="34"
        inputType="password"
        inputId="test_input1"
        inputImg={IconPassword}
        leftIcon={true}
        rightIcon={false}
        placeholder="insert password"
      />
      <BasicInput
        width="130"
        height="34"
        inputType="text"
        inputId="test_input2"
        inputImg={IconCalendar}
        leftIcon={false}
        rightIcon={true}
        placeholder="YYYY-MM-DD"
        // onchange={}
      />
      <IconButton
        width="114"
        height="34"
        buttonId="testbutton1"
        buttonImg={IconDelete}
        innerText={t("common.delete")}
        leftIcon={true}
      />
      <IconButton
        buttonId="testbutton2"
        buttonImg={IconDelete}
        innerText={t("common.delete")}
        rightIcon={true}
      />
    </div>
  );
}
