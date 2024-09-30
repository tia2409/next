export default function BasicButton({
  width = "98",
  border = false,
  round = false,
  innerText,
  onClick,
}) {
  return (
    <button
      className={`h-[34px] px-5 font-medium ${
        border
          ? "text-[var(--main02)] border border-[var(--main02)] bg-white hover:bg-main04"
          : "text-white bg-main02 hover:bg-main01"
      }`}
      onClick={onClick}
      style={{
        width: `${width}px`,
        borderRadius: round ? "17px" : "3px",
      }}
    >
      {innerText}
    </button>
  );
}
