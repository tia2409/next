import React, { useState } from "react";
import Image from "next/image";
import styles from "./index.module.css";

// import deleteIcon from "../../../public/images/icons/icon_cal_delete.svg";

export default function IconButton({
  buttonType,
  buttonId,
  buttonImg,
  innerText,
  onclick,
  width,
  height,
  leftIcon,
  rightIcon,
  ...props
}) {
  const [isLeftIcon, setIsLeftIcon] = useState(leftIcon || false);
  const [isRightIcon, setIsRightIcon] = useState(rightIcon || false);

  // let btnImage;
  // if (buttonType == "delete") {
  //   btnImage = (
  //     <>
  //       <Image className="" width={22} height={22} src={deleteIcon} alt="id" />
  //       <span>삭제하기</span>
  //     </>
  //   );
  // } else {
  //   btnImage = (
  //     <Image className="" width={22} height={22} src={buttonImg} alt="id" />
  //   );
  // }
  return (
    <div>
      <button
        id={buttonId}
        className={`${styles.btn}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          paddingLeft: isLeftIcon ? "28px" : "",
          paddingRight: isRightIcon ? "28px" : "",
        }}
        onClick={onclick}
      >
        {/* {btnImage} */}
        <Image
          src={buttonImg}
          className={` ${isLeftIcon && styles.left_icon} ${
            isRightIcon && styles.right_icon
          } `}
          width={22}
          height={22}
          alt="icon"
        />
        <div className="w-fit">{innerText}</div>
      </button>
    </div>
  );
}
