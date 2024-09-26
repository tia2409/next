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
import InputIcon from "../InputIcon";
import BasicSelect from "../BasicSelect";

import Filter from "./component/Filter";

const options = [
  { value: "10", label: "10줄" },
  { value: "15", label: "15줄" },
  { value: "20", label: "20줄" },
  { value: "40", label: "40줄" },
];

const index = ({ headers, data }) => {
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

  useEffect(() => {
    restoreAllData(); // useEffect 내에서 메서드를 호출
    // setGlobalFilter(document.getElementById("tableSearch")?.value);
    setGlobalFilter(inputRef.current?.value);
    table.setPageSize(document.getElementsByName("perPage")[0]?.value);
  }, []);
  const columns = useMemo(
    () => [
      {
        id: "selection",
        header: ({ table }) => (
          <div className=" relative text-center">
            <input
              id="header-checkbox"
              type="checkbox"
              className="absolute left-[10px] top-[3px]"
              checked={table.getIsAllPageRowsSelected()} // 전체 row가 선택되었는지 확인
              onChange={table.getToggleAllPageRowsSelectedHandler()} // 전체 row를 선택/해제하는 handler
            />
            번호
          </div>
        ),
        cell: ({ row }) => (
          <div className=" relative text-center">
            <input
              id={`cell-checkbox-${row.id}`}
              type="checkbox"
              className="absolute left-0 top-[3px]"
              checked={row.getIsSelected()} // row가 선택되었는지 확인
              disabled={!row.getCanSelect()} // row가 선택 가능한지 확인
              onChange={row.getToggleSelectedHandler()} // row를 선택/해제하는 handler
            />
            {Number(row.id) + 1}
          </div>
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
      })),
    ],
    [headers, data]
  );

  const table = useReactTable({
    data,
    columns,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      rowSelection,
      globalFilter,
    },
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    globalFilterFn: (row, _columnIds, filterValue) => {
      return row.getAllCells().some((cell) => {
        const cellValue = cell.getValue();
        return String(cellValue)
          .toLowerCase()
          .includes(String(filterValue).toLowerCase());
      });
    },

    getFilteredRowModel: getFilteredRowModel(),
  });

  // 페이지 범위를 계산하는 함수 (1~10, 11~20 형태)
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

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    table.setPageIndex(page - 1);
    setRowSelection({});
  };

  return (
    <div className="block max-w-full h-full">
      <div className="h-2" />
      <div className="flex justify-between mb-[10px] h-[44px] pt-[10px] items-center">
        <div className="flex">
          <span className="flex text-center items-center text-[14px] mr-[8px]">
            <div>총</div>
            <strong>
              {table.getPageCount()} 페이지 중{" "}
              {table.getState().pagination.pageIndex + 1}
            </strong>
          </span>

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
        {/* <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
        <div className={`flex ${styles.rightContainer}`}>
          <Filter
            ref={inputRef}
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(value)}
            placeholder="Search all columns..."
            debounce={500}
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
                        asc: "up",
                        desc: "down",
                      }[header.column.getIsSorted()]
                    }
                    {header.column.getCanSort() && !header.column.getIsSorted()
                      ? ""
                      : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={`${styles.tr}`}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

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

        {/* 페이지 번호 버튼 */}
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
    </div>
  );
};

export default index;
