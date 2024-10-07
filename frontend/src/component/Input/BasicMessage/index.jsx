import Image from "next/image";
import React from "react";

// image
import IconBasic from "./../../../../public/images/icons/input/msg_gray.svg";

export default function BasicMessage({ message }) {
  return (
    <div className="flex">
      <Image
        className="pr-1"
        src={IconBasic}
        width={18}
        height={18}
        alt="baisc-msg"
      />
      <div className="text-[12px] text-gray04">{message}</div>
    </div>
  );
}
