import { useEffect, useState } from "react";
import styles from "./index.module.css";
import BasicInput from "../BasicInput";
import search_input from "../../../public/images/icons/input/search.svg";
import IconButton from "../IconButton";
import BasicSelect from "../BasicSelect";

const options = [
  { value: "10", label: "10줄" },
  { value: "15", label: "15줄" },
  { value: "20", label: "20줄" },
  { value: "40", label: "40줄" },
];

export default function DataTable({
  headers,
  items = [],
  selectable = false,
  itemKey,
  updateSelection,
  pagination = false,
  itemsPerPage = 10,
  selectPerPage = true,
}) {
  if (!headers || !headers.length) {
    throw new Error("<DataTable /> headers is required.");
  }

  const headerKey = headers.map((header) => header.value);
  if (!itemKey) {
    itemKey = headerKey[0];
  }

  const [selection, setSelection] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(itemsPerPage);
  const totalPages = Math.ceil(items.length / perPage);

  const onChangeSelect = (value) => {
    const newSelection = new Set(selection);
    if (newSelection.has(value)) {
      newSelection.delete(value);
    } else {
      newSelection.add(value);
    }
    setSelection(newSelection);
    updateSelection([...newSelection]);
  };

  const onChangeSelectAll = (e) => {
    if (e.target.checked) {
      const allCheckedSelection = new Set(
        getAbledItems(items).map((item) => item[itemKey])
      );
      setSelection(allCheckedSelection);
      updateSelection([...allCheckedSelection]);
    } else {
      setSelection(new Set());
      updateSelection([]);
    }
  };

  const getAbledItems = (items) => {
    return items.filter(({ disabled }) => !disabled);
  };

  const isSelectedAll = () => {
    return selection.size === getAbledItems(items).length;
  };

  const filteredItems = items.filter((item) =>
    headerKey.some((key) =>
      item[key].toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // 페이지네이션 계산
  const paginateItems = (items) => {
    return pagination && !searchQuery
      ? items.slice((currentPage - 1) * perPage, currentPage * perPage)
      : items;
  };

  const paginatedItems = paginateItems(filteredItems);

  useEffect(() => {
    setCurrentPage(1); // 페이지 변경 시 첫 페이지로 초기화
  }, [perPage, searchQuery]);

  // 페이지 변경 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 페이지네이션 범위 계산
  const getPaginationRange = () => {
    const pageNumbersToShow = 5;
    const halfRange = Math.floor(pageNumbersToShow / 2);

    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, currentPage + halfRange);

    if (currentPage <= halfRange) {
      endPage = Math.min(totalPages, pageNumbersToShow);
    } else if (totalPages - currentPage < halfRange) {
      startPage = Math.max(1, totalPages - pageNumbersToShow + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div>
      {/* 검색 입력 필드 */}
      <div className="flex justify-between mb-[10px] h-[44px] pt-[10px]">
        <div className="flex">
          <label
            htmlFor="allClickButtom"
            className="flex text-center items-center text-[14px] mr-[8px]"
          >
            <button
              id="allClickButtom"
              onClick={() => document.querySelector("#allCheck").click()}
              className="font-medium"
            >
              전체 선택
            </button>
            <div className="border-r-[1px] border-solid border-[#909090] mx-[8px] h-[12px]" />
            <div className="flex items-center text-[#1976e5] font-bold">
              {selection.size}
            </div>
          </label>
          {selectPerPage && (
            <BasicSelect
              width="100"
              deleteOption={false}
              placeHolder="줄수"
              options={options}
              defaultValue
              onchange={(e) => setPerPage(e.value)}
              defaultSelectValue={options[0]}
            />
          )}
        </div>
        <div className={`flex ${styles.rightContainer}`}>
          <BasicInput
            inputId="tableSearch"
            inputImg={search_input}
            placeholder="Search..."
            value={searchQuery}
            onchange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // 검색할 때 페이지를 첫 페이지로 초기화
            }}
            height="34"
            width="230"
            className={styles.searchInput} // 스타일 추가 가능
          />
          <IconButton height="32" width="32" buttonType="delete" />
          <IconButton height="32" width="32" buttonType="filter" />
        </div>
      </div>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {selectable && (
              <th
                className={`${styles.select_column} ${styles.td} ${styles.checkTd}`}
                htmlFor="allCheck"
              >
                <input
                  id="allCheck"
                  type="checkbox"
                  checked={isSelectedAll()}
                  onChange={onChangeSelectAll}
                />
                번호
              </th>
            )}
            {headers.map((header) => (
              <th key={header.text} className={styles.th}>
                {header.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item, index) => (
              <tr
                key={index}
                className={`${styles.tr} ${
                  selection.has(item[itemKey]) ? styles.select_row : ""
                } ${item.disabled ? styles.disabled_row : ""}`}
              >
                {selectable && (
                  <td
                    className={`${styles.select_column} ${styles.td} ${styles.checkTd}`}
                  >
                    {!item.disabled && (
                      <input
                        type="checkbox"
                        disabled={item.disabled}
                        checked={selection.has(item[itemKey])}
                        onChange={() => onChangeSelect(item[itemKey])}
                      />
                    )}
                    {(currentPage - 1) * 10 + index + 1}
                  </td>
                )}
                {headerKey.map((key) => (
                  <td key={key + index} className={styles.td}>
                    {item[key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className={styles.tr}>
              <td
                colSpan={headers.length}
                className={`${styles.noResults} ${styles.td}`}
              >
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 페이지네이션 (검색 중이 아닐 때만 표시) */}
      {pagination && !searchQuery && (
        <div className={`flex items-center ${styles.pagination}`}>
          {/* 이전 페이지 버튼 */}
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className={`${styles.paginationButton} ${styles.firstArrow}`}
          />
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${styles.paginationButton} ${styles.preArrow}`}
          />

          {/* 페이지 번호 버튼 */}
          {getPaginationRange().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`${styles.navigationButton} ${
                page === currentPage ? styles.activePage : ""
              }`}
            >
              {page}
            </button>
          ))}

          {/* 다음 페이지 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${styles.paginationButton} ${styles.nextArrow}`}
          />

          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`${styles.paginationButton} ${styles.lastArrow}`}
          />
        </div>
      )}
    </div>
  );
}
