// components/Table.js
import React, { useMemo, useState, useEffect, useRef } from "react";
import useFormData from "@/component/hooks/useFormData";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import styles from "./index.module.css";
import BasicSelect from "../BasicSelect";
import Filter from "./component/Filter";
import both from "../../../public/images/icons/table/sort_both.png";
import sort_desc from "../../../public/images/icons/table/sort_desc.png";
import sort_asc from "../../../public/images/icons/table/sort_asc.png";
import icon_excel from "../../../public/images/icons/icon_excel.svg";
import Image from "next/image";
import IconButton from "../IconButton";

import { mkConfig, generateCsv, download } from "export-to-csv";

const options = [
  { value: "10", label: "10줄" },
  { value: "15", label: "15줄" },
  { value: "20", label: "20줄" },
  { value: "40", label: "40줄" },
];

const index = ({
  headers,
  data,
  paginationEnabled = false,
  checkEnabled = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { restoreAllData } = useFormData();
  const inputRef = useRef(null); // Input 값을 위한 ref
  const [mergeKey, setMergeKey] = useState(Date.now());

  useEffect(() => {
    restoreAllData();
    setGlobalFilter(inputRef.current?.value);
    table.setPageSize(document.getElementsByName("perPage")[0]?.value);
  }, []);

  const calculateRowSpan = (table, rowIndex, columnId) => {
    const rows = table.getRowModel().rows;
    const currentValue =
      rows[rowIndex - rows.length * pagination.pageIndex]?.getValue(columnId);
    let span = 1;

    // 이후 행을 확인하면서 rowSpan 계산
    for (
      let i = rowIndex + 1;
      i < rows.length * (pagination.pageIndex + 1);
      i++
    ) {
      const nextValue =
        rows[i - rows.length * pagination.pageIndex]?.getValue(columnId);
      // 값이 동일하면 span 증가
      if (currentValue === nextValue) {
        span++;
      } else {
        break; // 값이 달라지면 멈춤
      }
    }

    return span;
  };

  const columns = useMemo(
    () => [
      {
        id: "selection",
        header: ({ table }) => (
          <div className=" relative text-center">
            {checkEnabled && (
              <input
                id="header-checkbox"
                type="checkbox"
                className="absolute left-[10px] top-[3px]"
                checked={table.getIsAllPageRowsSelected()}
                onChange={table.getToggleAllPageRowsSelectedHandler()}
              />
            )}
            번호
          </div>
        ),
        cell: ({ row }) => (
          <td className={`${styles.tr} ${styles.indexTr}`}>
            <div className=" relative text-center">
              {checkEnabled && (
                <input
                  id={`cell-checkbox-${row.id}`}
                  type="checkbox"
                  className="absolute left-[10px] top-[1px]"
                  checked={row.getIsSelected()}
                  disabled={!row.getCanSelect()}
                  onChange={row.getToggleSelectedHandler()}
                />
              )}
              {Number(row.id) + 1}
            </div>
          </td>
        ),
        size: 50,
      },
      ...headers.map((header) => ({
        accessorKey: header.key,
        header: header.label,
        width: header.width,
        enableRowSpan: header.enableRowSpan,
        footer: (info) => info.column.id,
        enableSorting: true,
        sortingFn: "auto",
        cell: (info) => {
          const cellValue = info.getValue();
          const rowSpanValue = header.enableRowSpan
            ? calculateRowSpan(table, info.row.index, info.column.id)
            : 1;
          if (
            header.enableRowSpan &&
            (rowSpanValue === 0 ||
              (info.row.index > 0 &&
                calculateRowSpan(table, info.row.index - 1, info.column.id) >
                  1))
          ) {
            return null;
          }

          return (
            <td
              rowSpan={rowSpanValue}
              colSpan={header.colSpan || 1}
              className={styles.td}
            >
              {cellValue}
            </td>
          );
        },
      })),
    ],
    [headers, data, mergeKey] // 여기서 mergeKey를 의존성으로 추가
  );

  const table = useReactTable({
    data,
    columns,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination: paginationEnabled ? pagination : undefined,
      rowSelection,
      globalFilter,
    },
    onPaginationChange: paginationEnabled ? setPagination : undefined,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: paginationEnabled
      ? getPaginationRowModel()
      : undefined,
  });

  const getPaginationRange = () => {
    const totalPageCount = table.getPageCount();
    const currentPageGroup = Math.floor(pagination.pageIndex / 10);
    const startPage = currentPageGroup * 10 + 1;
    const endPage = Math.min(startPage + 9, totalPageCount);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, idx) => startPage + idx
    );
  };

  const handlePageChange = (page) => {
    table.setPageIndex(page - 1);
    setRowSelection({});
  };
  useEffect(() => {
    // rowSelection이 변경될 때 병합을 다시 적용
    refreshMerge();
  }, [pagination.pageIndex]);

  const refreshMerge = () => {
    setMergeKey(Date.now()); // 병합을 다시 그리도록 상태값을 업데이트
  };

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    filename: "sample", // 내보내기 파일 이름(.csv 없이)
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
    exportExcel(table.getFilteredRowModel().rows);
  };

  return (
    <div className="block max-w-full h-full">
      <div className="h-2" />
      <div className="flex justify-between mb-[10px] h-[44px] pt-[10px] items-center">
        <div className="flex">
          {paginationEnabled && (
            <span className="flex text-center items-center text-[14px] mr-[8px]">
              <div>총</div>
              <strong>
                {table.getPageCount()} 페이지 중{" "}
                {table.getState().pagination.pageIndex + 1}
              </strong>
            </span>
          )}

          <BasicSelect
            width="100"
            deleteOption={false}
            placeHolder="줄수"
            options={options}
            onchange={(selectedOption) => {
              table.setPageSize(Number(selectedOption.value));
              setPerPage(selectedOption.value);
            }}
            defaultSelectValue={options[0]}
            inputId="perPage"
          />
        </div>
        <div className={`flex ${styles.rightContainer}`}>
          <Filter
            ref={inputRef}
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(value)}
            placeholder="Search all columns..."
            debounce={500}
          />
          <IconButton
            buttonType=""
            buttonId="excel_download"
            buttonImg={icon_excel}
            innerText="엑셀다운로드"
            onclick={handleExportToCsv}
            width="114"
            height="34"
          />
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={styles.tr}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={`${styles.th} relative`}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ width: header.getSize() }}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  )}{" "}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    {
                      {
                        asc: (
                          <Image
                            src={sort_asc}
                            alt="sort_asc"
                            width={19}
                            height={19}
                          />
                        ),
                        desc: (
                          <Image
                            src={sort_desc}
                            alt="sort_desc"
                            width={19}
                            height={19}
                          />
                        ),
                      }[header.column.getIsSorted()]
                    }
                    {header.column.getCanSort() &&
                    !header.column.getIsSorted() ? (
                      <Image src={both} alt="both" width={19} height={19} />
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.tr}>
              {row.getVisibleCells().map((cell, cellIndex) =>
                flexRender(cell.column.columnDef.cell, {
                  ...cell.getContext(),
                  key: `cell-${row.id}-${cellIndex}`,
                })
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {paginationEnabled && (
        <div className={`flex items-center ${styles.pagination}`}>
          <button
            className={`${styles.paginationButton} ${styles.firstArrow}`}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          />
          <button
            className={`${styles.paginationButton} ${styles.preArrow}`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          />

          {getPaginationRange().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`${styles.navigationButton} ${
                page === pagination.pageIndex + 1 ? styles.activePage : ""
              }`}
            >
              {page}
            </button>
          ))}

          <button
            className={`${styles.paginationButton} ${styles.nextArrow}`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          />
          <button
            className={`${styles.paginationButton} ${styles.lastArrow}`}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          />
        </div>
      )}
    </div>
  );
};

export default index;
