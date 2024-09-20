import useFormData from "@/component/hooks/useFormData";
import React from "react";
import { useTranslation } from 'react-i18next'; // 다국어 처리를 위해 import 하기

export default function index() {
  useFormData();
  const { t } = useTranslation(); // import한 useTranslation

  return (
    <div className="w-full p-4 h-[100% - 41px]">
      {/* json파일에서 단일 key: value */}
      <div>{t('test')}</div> 
      {/* json파일에서 key: { key : value } 형태 */}
      <div>{t('menu.add')}</div>
      <input id="plz2" />
    </div>
  );
}
