import React, { useState } from "react";
import Image from "next/image";
import styles from "./index.module.css";

import IconInvisible from "./../../../public/images/icons/input/invisible.svg";
import IconVisible from "./../../../public/images/icons/input/visible.svg";

export default function BasicInput({
  width = "360",
  height = "34",
  inputType = "text",
  inputId,
  inputImg,
  leftIcon = false,
  rightIcon = false,
  placeholder,
  disabled = false,
  value,
  onFocus,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(true);

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
          color: disabled ? "var(--gray05)" : "black",
          backgroundColor: disabled ? "var(--gray06)" : "white",
          paddingLeft: leftIcon ? "34px" : undefined,
          paddingRight:
            rightIcon || inputType == "password" ? "34px" : undefined,
        }}
        type={inputType == "password" && showPassword ? "password" : "text"}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onFocus={onFocus}
        onChange={onChange}
      />
      {(leftIcon || rightIcon) && (
        <Image
          className={` ${leftIcon && styles.left_icon} ${
            rightIcon && styles.right_icon
          } absolute right-0 -translate-y-1/2 top-1/2`}
          width={34}
          height={34}
          src={inputImg}
          alt="right"
        />
      )}
      {inputType === "password" && (
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
