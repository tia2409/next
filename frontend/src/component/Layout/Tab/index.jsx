import React from "react";
import styles from "./index.module.css";

export default function Tab({ label, isActive, onClick, onDelete }) {
  return (
    <div
      className={`${styles.tabContainer} ${isActive && styles.active}`}
      onClick={onClick}
    >
      <span className={styles.tabTitle}>{label}</span>
      <div
        className={styles.closeTrigger}
        onClick={(event) => {
          event.stopPropagation(); // 버블링 방지
          onDelete();
        }}
      ></div>
    </div>
  );
}
