import BasicSelect from "@/component/BasicSelect";
import useFormData from "@/component/hooks/useFormData";
import RoundButton from "@/component/RoundButton";
import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // 다국어 처리를 위해 import 하기

export default function Index({toggleDetailbar}) {
  useFormData();
  const { t } = useTranslation(); // import한 useTranslation

  return (
    <div className="w-full h-full p-4">
      {/* json파일에서 단일 key: value */}
      <div>{t("test")}</div>
      {/* json파일에서 key: { key : value } 형태 */}
      <div>{t("menu.add")}</div>
      <input id="plz2" />
      <BasicSelect />
      <RoundButton width='w-[360px]' toggleDetailbar={toggleDetailbar}>Detail bar button</RoundButton>
      <RoundButton toggleDetailbar={toggleDetailbar}>Detail bar button2</RoundButton>
    </div>
  );
}
