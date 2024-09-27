import React, { useState } from "react";
import Image from "next/image";
import styles from "./index.module.css";

import IconInvisible from "./../../../public/images/icons/input/invisible.svg";
import IconVisible from "./../../../public/images/icons/input/visible.svg";

export default function BasicInput({
  width = "360",
  height = "34",
  inputType,
  inputId,
  inputImg,
  leftIcon,
  rightIcon,
  placeholder,
  disable,
  value,
  onFocus,
  onChange,
}) {
  const [isInputType, setIsInputType] = useState(inputType || "text");
  const [showPassword, setShowPassword] = useState(true);
  const [isLeftIcon, setIsLeftIcon] = useState(leftIcon || false);
  const [isRightIcon, setIsRightIcon] = useState(rightIcon || false);
  const [isDisable, setIsDisable] = useState(disable || false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className="relative flex"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <input
        id={inputId}
        name={inputId}
        className="w-full h-full p-[12px]"
        style={{
          color: isDisable ? "var(--gray05)" : "black",
          backgroundColor: isDisable ? "var(--gray06)" : "white",
          paddingLeft: isLeftIcon ? "34px" : "",
          paddingRight: isRightIcon || inputType == "password" ? "34px" : "",
        }}
        type={inputType == "password" && showPassword ? "password" : "text"}
        placeholder={placeholder}
        disable={disable}
        value={value}
        onFocus={onFocus}
        onChange={onChange}
      />
      {(isLeftIcon || isRightIcon) && (
        <Image
          className={` ${isLeftIcon && styles.left_icon} ${
            isRightIcon && styles.right_icon
          } absolute right-0 -translate-y-1/2 top-1/2`}
          width={34}
          height={34}
          src={inputImg}
          alt="right"
        />
      )}
      {isInputType === "password" && (
        <Image
          className="absolute right-0 -translate-y-1/2 top-1/2"
          src={showPassword ? IconInvisible : IconVisible}
          alt="view"
          width={34}
          height={34}
          onClick={toggleShowPassword}
        />
      )}
    </div>
  );
}
