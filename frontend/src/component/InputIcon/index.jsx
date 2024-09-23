import React from "react";
import Image from "next/image";

export default function InputIcon({
  inputId,
  inputImg,
  placeholder,
  onchange,
  width,
  height,
  ...props
}) {
  return (
    <div
      className="relative"
      style={{ width: `${width}px`, height: `${height}px` }} // width와 height를 직접 style로 지정
    >
      <input
        className="w-full h-full pl-[12px]" // Tailwind는 직접적으로 px 값을 넣어야 함
        style={{ paddingRight: `${height}px` }} // 동적인 padding-right를 적용
        id={inputId}
        type="text"
        placeholder={placeholder}
        onChange={onchange}
      />
      <Image
        id={inputId}
        className="absolute right-0 top-0 h-full"
        width={height}
        height={height}
        src={inputImg}
        alt="id"
      />
    </div>
  );
}
