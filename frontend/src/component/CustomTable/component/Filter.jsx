import React, { useState, useEffect, forwardRef } from "react";
import Image from "next/image";
import search_input from "../../../../public/images/icons/input/search.svg";

// forwardRef를 사용해 ref를 부모로부터 받아 처리
const Filter = forwardRef(
  ({ value: initialValue, onChange, debounce = 500, ...props }, ref) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);

      return () => clearTimeout(timeout);
    }, [value, debounce, onChange]);

    return (
      <div className="relative flex w-full">
        <Image
          className="absolute top-[0px] right-0"
          width={34}
          height={34}
          src={search_input}
          alt="search icon"
        />
        <input
          {...props}
          ref={ref} // ref를 연결
          value={value}
          id="tableSearch"
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-[34px]  pl-[12px] pr-[34px]"
        />
      </div>
    );
  }
);

// forwardRef로 전달된 컴포넌트에는 displayName을 설정하는 것이 좋습니다
Filter.displayName = "Filter";

export default Filter;
