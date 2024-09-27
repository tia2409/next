import { useState } from "react";

export default function BasicButton({
  width,
  border,
  text,
  background,
  round,
  innerText,
  onClick,
}) {
  const [isRound, isSetRound] = useState(round || false);

  return (
    <button
      className={`h-[34px] ${text} ${background} px-5 font-medium`}
      onClick={onClick}
      style={{
        width: width,
        border: border || "",
        color: text,
        backgroundColor: background,
        borderRadius: isRound ? "17px" : "3px",
      }}
    >
      {innerText}
    </button>
  );
}
