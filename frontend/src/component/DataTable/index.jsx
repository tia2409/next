import { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function DataTable({
  headers,
  items = [],
  selectable = false,
  itemKey,
  updateSelection,
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

  return (
    <div>
      {/* 검색 입력 필드 */}
      <input
        type="text"
        placeholder="Search..."
        id="tableSearch"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput} // 스타일 추가 가능
      />

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {selectable && (
              <th className={styles.th}>
                <input
                  type="checkbox"
                  checked={isSelectedAll()}
                  onChange={onChangeSelectAll}
                />
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
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <tr
                key={index}
                className={`${styles.tr} ${
                  selection.has(item[itemKey]) ? styles.select_row : ""
                } ${item.disabled ? styles.disabled_row : ""}`}
              >
                {selectable && (
                  <td className={`${styles.select_column} ${styles.td}`}>
                    {!item.disabled && (
                      <input
                        type="checkbox"
                        disabled={item.disabled}
                        checked={selection.has(item[itemKey])}
                        onChange={() => onChangeSelect(item[itemKey])}
                      />
                    )}
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
    </div>
  );
}
