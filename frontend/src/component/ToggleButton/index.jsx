import { useEffect, useState } from "react";
import styles from "./index.module.css"; // CSS 모듈을 불러옵니다

const ToggleButton = ({ innerText, onchange }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    onchange(isActive); // 상태 변경 시 부모 컴포넌트에 상태 전달
  }, [isActive]);

  return (
    <div className="flex items-center">
      <p className={styles.toggleText} onClick={() => setIsActive(!isActive)}>
        {innerText}
      </p>
      <label className={styles.toggleSwitch}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
        />
        <span className={styles.toggleSlider}></span>
      </label>
    </div>
  );
};

export default ToggleButton;
