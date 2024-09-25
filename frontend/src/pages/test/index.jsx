import BasicSelect from "@/component/BasicSelect";
import useFormData from "@/component/hooks/useFormData";
import BasicButton from "@/component/BasicButton";
import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // 다국어 처리를 위해 import 하기

export default function Index() {
  useFormData();
  const { t } = useTranslation(); // import한 useTranslation

  return (
    <div className="w-full h-full p-4">
      {/* json파일에서 단일 key: value */}
      <div>{t("test")}</div>
      {/* json파일에서 key: { key : value } 형태 */}
      <div>{t("login.join")}</div>
      <input id="plz2" />
      <BasicSelect />
      <BasicButton
        width="360px"
        border=""
        text="text-white"
        background="bg-main02"
        innerText="innerText"
      />
    </div>
  );
}
