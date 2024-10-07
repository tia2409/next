import React from "react";
import Image from "next/image";

// image
import IconStarLabel from "../../../../public/images/icons/input/star_label.svg";

function index({ labelTitle, star = true, children }) {
  return (
    <div className="w-fit max-h-[74px] px-[4px] py-[10px] h-full">
      <div className="flex">
        <div>{labelTitle}</div>
        {star && <Image src={IconStarLabel} width={20} height={20} />}
      </div>
      {children}
    </div>
  );
}
export default index;
