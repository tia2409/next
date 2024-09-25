import React, { useState } from "react";
import Image from "next/image";

import invisible from "./../../../public/images/icons/icon_invisible.svg";
import visible from "./../../../public/images/icons/icon_visible.svg";

export default function IconInput({ inputType, inputId, inputImg, placeholder, ...props }) {
  const [showPassword, setShowPassword] = useState(true);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  let buttonValue = null;

  if (inputType == "password") {
    buttonValue = (
      <Image
        className="absolute right-2.5 top-2"
        src={showPassword ? invisible : visible}
        alt="view"
        width={28}
        height={28}
        onClick={toggleShowPassword}
      />
    );
  }
  return (
    <div className="relative flex w-full">
      <Image
        id={inputId}
        className="absolute top-[3px]"
        width={38}
        height={38}
        src={ inputImg }
        alt="id"
      />
      <input
        id={inputId}
        className="w-full h-[44px] py-[12px] pr-[20px] pl-[38px]"
        type={inputType == "password" && showPassword ? "password" : "text"}
        placeholder={placeholder}
        {...props}
      />
      {buttonValue}
    </div>
  );
}

