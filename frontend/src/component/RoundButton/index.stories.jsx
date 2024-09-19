export default {
    title: 'Components/Button/RoundButton',  
    component: RoundButton,
    args: {
        innerText: 'RoundButton', 
    },
};

export function RoundButton({ innerText }) {
    return (
        <button type="submit" value="Login" className="text-white bg-[#0065bd] w-full font-medium h-[48px]">{innerText}</button>
    );
}