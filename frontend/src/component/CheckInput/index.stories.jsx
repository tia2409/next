import { useState } from "react";
import Image from "next/image";

import checkMark from "./../../../public/images/icons/Input_Checkbox_blue.svg";

export default {
  title: 'Components/Input/CheckInput',  
  component: CheckInput,
};

export function CheckInput({ inputId, content, ...props }) {
    const [isChecked, setIsChecked] = useState(true);
  
    const checkIsChecked = () => {
      setIsChecked((prev) => !prev);
    };
    
    return (
      <label className="relative p-[12px] pl-[35px] cursor-pointer" htmlFor={inputId}>
          <span className="font-medium text-[#909090]">{content}</span>
          <input id={inputId} type="checkbox" checked={isChecked ? "" : "checked"} className="opacity-0"  {...props} />
          <span className="absolute top-[12px] left-0 w-[18px] h-[18px] bg-[#474747]" onClick={checkIsChecked}>
            {isChecked ? <Image src={checkMark} width={18} height={18} alt="check" /> : ""}
          </span>
      </label>
    );
  }
  