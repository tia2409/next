import React from "react";
import styles from "./index.module.css";
import RoundButton from "../RoundButton";

export default function Detailbar({toggleDetailbar, isDetailbarOpen }) {
  return (
    <div
      className={`h-[calc(100vh-72px)] px-[10px] py-[20px] bg-[#121212] ${
        isDetailbarOpen ? styles.detailbarEnter : styles.detailbarExit
      }`}
    >
      <RoundButton width='w-[300px]' toggleDetailbar={toggleDetailbar} innerText="test" />
    </div>
  );
}
