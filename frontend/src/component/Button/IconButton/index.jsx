import React from "react";
import Image from "next/image";
import styles from "./index.module.css";

export default function IconButton({
  buttonType,
  buttonId,
  buttonImg,
  innerText,
  onclick,
  width,
  height,
  leftIcon = false,
  rightIcon = false,
  ...props
}) {
  return (
    <div>
      <button
        id={buttonId}
        className={`${styles.btn}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          paddingLeft: leftIcon ? "28px" : "",
          paddingRight: rightIcon ? "28px" : "",
        }}
        onClick={onclick}
      >
        {/* {btnImage} */}
        <Image
          src={buttonImg}
          className={` ${leftIcon && styles.left_icon} ${
            rightIcon && styles.right_icon
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
