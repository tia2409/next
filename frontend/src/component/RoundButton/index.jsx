export default function RoundButton({ innerText }) {
    return (
        <button type="submit" value="Login" className="text-white bg-[#0065bd] w-full font-medium h-[48px]">{innerText}</button>
    );
}