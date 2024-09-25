import React, { useState, useRef, useEffect } from "react";
import ToggleButton from "../ToggleButton";
import styles from "./index.module.css";

function Index({ children }) {
  const [checked, setChecked] = useState(false);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("44px");

  useEffect(() => {
    if (checked) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`); // 내용에 따라 높이 설정
    } else {
      setMaxHeight("44px"); // 최소 높이로 설정
    }
  }, [checked]);

  return (
    <div
      className={styles.container}
      style={{
        maxHeight: maxHeight,
        transition: "max-height 0.4s ease-in-out",
      }} // 인라인 스타일로 애니메이션 적용
    >
      <div ref={contentRef} className={styles.content}>
        {checked && <span>{children}</span>}
      </div>
      <div className={styles.toggle}>
        <ToggleButton
          innerText="검색 조건 보기"
          onchange={(isActive) => setChecked(isActive)}
        />
      </div>
    </div>
  );
}

export default Index;
