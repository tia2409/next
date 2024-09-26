export default function BasicButton({
  width,
  border,
  text,
  background,
  innerText,
  onClick,
}) {
  return (
    <button
      className={`w-[${width}] h-[34px] ${border} ${text} ${background} px-5 rounded-[3px] font-medium`}
      onClick={onClick}
      style={{
        width: width,
        border: border || "",
        color: text,
        backgroundColor: background,
      }}
    >
      {innerText}
    </button>
  );
}
