import React, { useState } from "react";
import Image from "next/image";
import deleteIcon from "../../../public/images/icons/icon_cal_delete.svg";
import filterIcon from "../../../public/images/icons/icon-filter.svg";
import styles from "./index.module.css";
export default function IconInput({
  buttonType,
  buttonId,
  buttonImg,
  innerText,
  onclick,
  width,
  height,
  ...props
}) {
  let btnImage;
  if (buttonType == "delete") {
    btnImage = (
      <>
        <Image className="" width={22} height={22} src={deleteIcon} alt="id" />
        <span>삭제하기</span>
      </>
    );
  } else if (buttonType == "filter") {
    btnImage = (
      <div className="relative pr-[22px]">
        <div>Filter</div>
        <Image
          className="absolute right-[-7px]"
          style={{ bottom: "-6px" }}
          width={height}
          height={height}
          src={filterIcon}
          alt="id"
        />
      </div>
    );
  } else {
    btnImage = (
      <>
        <Image className="" width={22} height={22} src={buttonImg} alt="id" />
        <span>{innerText}</span>
      </>
    );
  }
  return (
    <button
      id={buttonId}
      className={`${styles.btn} `}
      style={{ width: `fit-content`, height: `${height}px` }}
      onClick={onclick}
    >
      {btnImage}
    </button>
  );
}
