import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css"; // CSS 모듈 임포트

const Marquee = ({ text, classname }) => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);

  const checkOverflow = () => {
    console.log(textRef.current.scrollWidth, containerRef.current.clientWidth);
    if (textRef.current.scrollWidth > containerRef.current.clientWidth) {
      setIsOverflow(true);
    } else {
      setIsOverflow(false);
    }
  };
  useEffect(() => {
    // 컴포넌트가 마운트될 때와 윈도우 크기 변경 시 체크
    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [text]);

  return (
    <div className={`${styles.marquee}`} ref={containerRef}>
      <p
        ref={textRef}
        className={`${isOverflow ? styles.animation : ""} ${classname}`}
      >
        {text}
      </p>
    </div>
  );
};

export default Marquee;
