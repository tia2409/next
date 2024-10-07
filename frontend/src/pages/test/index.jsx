import React from "react";
import { useTranslation } from "react-i18next";

// image
import IconPassword from "../../../public/images/icons/input/password.svg";
import IconDelete from "../../../public/images/icons/button/delete.svg";

// component
import BasicSelect from "@/component/Select/BasicSelect";
import useFormData from "@/component/hooks/useFormData";
import BasicButton from "@/component/Button/BasicButton";
import BasicInput from "@/component/Input/BasicInput";
import IconButton from "@/component/Button/IconButton";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function Index({ togglePopUp, toggleModal }) {
  useFormData();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full p-4">
      {/* json파일에서 단일 key: value */}
      <div>{t("test")}</div>
      {/* json파일에서 key: { key : value } 형태 */}
      <div>{t("login.join")}</div>
      <BasicSelect
        inputId="test"
        width="230"
        placeHolder="select basic one"
        options={options}
      />
      <BasicSelect
        inputId="test1"
        width="230"
        placeHolder="select check one"
        options={options}
        defaultSelectValue={options[0]}
        type="check"
      />
      <BasicSelect
        inputId="test-multi"
        width="230"
        Searchable={false}
        placeHolder="select multi"
        options={options}
        defaultSelectValue={options[0]}
        type="multi"
      />
      <BasicSelect
        inputId="test-multi-search"
        width="230"
        Searchable={true}
        placeHolder="select multi search"
        options={options}
        defaultValue
        // onchange={(e) => setPerPage(e.value)}
        type="multi"
      />
      <BasicButton
        width="360"
        round={true}
        innerText="PopUp Open"
        onClick={() => {
          togglePopUp({ title: "팝업 제목", content: "팝업 내용" });
        }}
      />
      <BasicButton
        width="360"
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
        width="360"
        border={true}
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
        placeholder="insert password"
      />
      <BasicInput
        width="130"
        height="34"
        inputType="text"
        inputId="test_input2"
        inputImg={IconPassword}
        rightIcon={true}
        placeholder="test"
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
      <div className="flex w-[360px]">
        <div className="flex items-center justify-center">
          <input type="radio" name="testRadio" id="radio1" value="off" />
          radio1
          <input type="radio" name="testRadio" id="radio2" />
          radio2
          <input type="radio" name="testRadio" id="radio3" />
          radio3
        </div>
      </div>
    </div>
  );
}
