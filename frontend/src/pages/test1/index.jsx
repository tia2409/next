import useFormData from "@/component/hooks/useFormData";
import React from "react";
import styles from "./index.module.css";

export default function index() {
  useFormData();
  return (
    <div className="w-full p-4 h-[100% - 41px]">
      <div>index3</div>
      <input type="text" id="plz3" />
      <div className={styles.marquee}>
        <p className={styles.p}>
          이것은 자동으로 이동하는 텍스트입니다. 텍스트가 길어지면 이와 같이
          보입니다.
        </p>
      </div>
    </div>
  );
}
