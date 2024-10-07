import Image from "next/image";
import React from "react";

// image
import IconError from "./../../../../public/images/icons/input/msg_red.svg";

export default function ErrorMessage({ message }) {
  return (
    <div className="flex">
      <Image
        className="pr-1"
        src={IconError}
        width={18}
        height={18}
        alt="baisc-msg"
      />
      <div className="text-[12px] text-[#ff1919]">{message}</div>
    </div>
  );
}
