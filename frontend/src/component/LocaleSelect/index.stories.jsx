import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';
import bottomArrow from "./../../../public/images/icons/select-down-arrow-white.svg";
import koFlag from "./../../../public/images/icons/ic-ko-flag.webp";
import enFlag from "./../../../public/images/icons/ic-en-flag.webp";
import jpFlag from "./../../../public/images/icons/ic-jp-flag.webp";

export default {
    title: 'Components/Select/LocaleSelect',  
    component: LocaleSelect,
};

export function LocaleSelect() {
    const [selectedLocale, setSelectedLocale] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const router = useRouter();
    let localeImg;

    const localeClicked = () => {
        setIsClicked((prev) => !prev);
    };

    const localeSelected = (locale) => () => {
        setSelectedLocale(locale);
        router.push(router.pathname, router.asPath, { locale });
    };

    useEffect(() => {
        const storedLocale = localStorage.getItem('selectedLocale');
        
        if (storedLocale) {
            setSelectedLocale(storedLocale);
        } else {
            setSelectedLocale('ko');
        }
    }, []);

    useEffect(() => {
        if (selectedLocale) {
            localStorage.setItem('selectedLocale', selectedLocale);
        }
    }, [selectedLocale]);

    if(selectedLocale == 'ko') {
        localeImg = koFlag;
    } else if (selectedLocale == 'en') {
        localeImg = enFlag;
    } else {
        localeImg = jpFlag;
    }

    return (
        <div className="relative flex cursor-pointer" onClick={localeClicked}>
            <Image className="rounded-[50%] my-[13.5px] border border-[#505050]" src={localeImg} width={18} height={18} alt="locale"/>
            {isClicked ? 
                <div className="absolute w-[100px] h-[120px] rounded-[12px] right-2 top-[52px] bg-white">
                    <div className="flex items-center w-full h-[40px] p-[10px]" onClick={localeSelected("ko")}>
                        <Image className="rounded-[50%] h-[18px] border border-[#505050]" src={koFlag} width={18} height={18} alt="ko"/>
                        <p className="pl-[10px] text-[#505050] font-medium">한국어</p>
                    </div>
                    <div className="flex items-center w-full h-[40px] p-[10px] border-y border-[#ebebeb]" onClick={localeSelected("en")}>
                        <Image className="rounded-[50%] h-[18px] border border-[#505050]" src={enFlag} width={18} height={18} alt="ko"/>
                        <p className="pl-[10px] text-[#505050] font-medium">English</p>
                    </div>
                    <div className="flex items-center w-full h-[40px] p-[10px]" onClick={localeSelected("jp")}>
                        <Image className="rounded-[50%] h-[18px] border border-[#505050]" src={jpFlag} width={18} height={18} alt="ko"/>
                        <p className="pl-[10px] text-[#505050] font-medium">日本語</p>
                    </div>
                </div> 
                : ""}
            <Image src={bottomArrow} width={36} height={44} alt="bottom_arrow" />
        </div>
    );
}
