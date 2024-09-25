export default function BasicButton({
  width,
  border,
  text,
  background,
  innerText,
}) {

  return (
    <button
      className={`w-[${width}] h-[34px] ${border} ${text} ${background} rounded-[3px] font-medium`}
    >
      {innerText}
    </button>
  );
}
