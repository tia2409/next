import { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function DataTable({
  headers,
  items = [],
  selectable = false,
  itemKey,
  updateSelection,
  pagination = false, // 페이지네이션 여부
  itemsPerPage = 10, // 한 페이지당 보여줄 아이템 개수
}) {
  if (!headers || !headers.length) {
    throw new Error("<DataTable /> headers is required.");
  }

  const headerKey = headers.map((header) => header.value);
  if (!itemKey) {
    itemKey = headerKey[0];
  }

  const [selection, setSelection] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const totalPages = Math.ceil(items.length / itemsPerPage); // 총 페이지 수 계산

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

  // 검색된 아이템 필터링
  const filteredItems = items.filter((item) =>
    headerKey.some((key) =>
      item[key].toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // 페이지에 따라 아이템 나누기 (검색어가 있을 때는 페이지네이션 비활성화)
  const paginatedItems =
    pagination && !searchQuery
      ? filteredItems.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : filteredItems;

  // 페이지 변경 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 페이지네이션에서 5개만 보여주고 현재 페이지가 가운데로 위치하도록 계산
  const getPaginationRange = () => {
    const pageNumbersToShow = 5;
    const halfRange = Math.floor(pageNumbersToShow / 2);

    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, currentPage + halfRange);

    // 페이지 범위가 5개보다 적은 경우, 범위를 보정
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
      <input
        type="text"
        placeholder="Search..."
        id="tableSearch"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1); // 검색할 때 페이지를 첫 페이지로 초기화
        }}
        className={styles.searchInput} // 스타일 추가 가능
      />

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {selectable && (
              <th
                className={`${styles.select_column} ${styles.td} ${styles.checkTd}`}
              >
                <input
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
        <div className={styles.pagination}>
          {/* 이전 페이지 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            {"<"}
          </button>

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
            className={styles.paginationButton}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
}
