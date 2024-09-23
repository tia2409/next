export default function RoundButton({ width, innerText, toggleDetailbar }) {
    return (
        <button type="submit" value="Login" className={`${width} text-white bg-[#0065bd] font-medium h-[48px]`} onClick={toggleDetailbar}>{innerText}</button>
    );
}