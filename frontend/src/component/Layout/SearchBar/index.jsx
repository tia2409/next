import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";

// component
import ToggleButton from "../../Button/ToggleButton";

function Index({ children }) {
  const [checked, setChecked] = useState(false);
  const contentRef = useRef(null);
  const toggleBox = useRef(null);
  const [maxHeight, setMaxHeight] = useState("40px");
  const [boxPadding, setBoxPadding] = useState("40px");

  useEffect(() => {
    if (toggleBox.current) {
      setBoxPadding(`${toggleBox.current.offsetWidth + 20}px`);
    }
  }, []);
  useEffect(() => {
    if (checked) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`); // 내용에 따라 높이 설정
    } else {
      setMaxHeight("40px"); // 최소 높이로 설정
    }
  }, [checked]);

  return (
    <div
      className={styles.container}
      style={{
        maxHeight: maxHeight,
        transition: "max-height 0.2s ease-in-out",
        paddingRight: boxPadding,
      }} // 인라인 스타일로 애니메이션 적용
    >
      <div ref={contentRef} className={styles.content}>
        {checked && <span className="flex">{children}</span>}
      </div>
      <div className={styles.toggle} ref={toggleBox}>
        <ToggleButton
          innerText="검색 조건 보기"
          onchange={(isActive) => setChecked(isActive)}
        />
      </div>
    </div>
  );
}

export default Index;
