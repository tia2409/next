import React, { useState, useEffect, useRef } from "react";
import icon_excel from "../../../../public/images/icons/icon_excel.svg";
import IconButton from "../../IconButton";
import { mkConfig, generateCsv, download } from "export-to-csv";

const ExcelDownload = ({ rows, filename }) => {
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
      buttonImg={icon_excel}
      innerText="엑셀다운로드"
      onclick={handleExportToCsv}
      width="114"
      height="34"
    />
  );
};

export default ExcelDownload;
