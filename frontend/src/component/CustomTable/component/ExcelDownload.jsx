import React, { useEffect } from "react";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useTranslation } from "react-i18next";

// image
import IconExcel from "../../../../public/images/icons/button/excel.svg";

// component
import IconButton from "../../Button/IconButton";

const ExcelDownload = ({ rows, filename }) => {
  const { t } = useTranslation();
  useEffect(() => {}, []);
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    filename: filename, // 내보내기 파일 이름(.csv 없이)
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });
  // 내보내기 함수
  const exportExcel = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };
  const handleExportToCsv = () => {
    exportExcel(rows);
  };
  return (
    <IconButton
      buttonType=""
      buttonId="excel_download"
      buttonImg={IconExcel}
      innerText={t("common.excelDownload")}
      onclick={handleExportToCsv}
      width="114"
      height="34"
    />
  );
};

export default ExcelDownload;
