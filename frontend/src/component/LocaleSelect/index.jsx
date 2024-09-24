import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import iconLanguageWhite from "./../../../public/images/icons/icon-language-white.svg";
import iconLanguageBlack from "./../../../public/images/icons/icon-language-black.svg";
// import bottomArrow from "./../../../public/images/icons/down-arrow-white.svg";
import koFlag from "./../../../public/images/icons/ic-ko-flag.webp";
import enFlag from "./../../../public/images/icons/ic-en-flag.webp";
import jpFlag from "./../../../public/images/icons/ic-jp-flag.webp";

export default function LocaleSelect() {
    const [selectedLocale, setSelectedLocale] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const { i18n } = useTranslation();
    const router = useRouter();
    const isLoginPage = router.pathname === "/";
    // let localeImg;

    const localeClicked = () => {
        setIsClicked((prev) => !prev);
    };

    const localeSelected = (locale) => () => {
        setSelectedLocale(locale);
        i18n.changeLanguage(locale);
        router.push(router.pathname, router.asPath, { locale });
    };

    useEffect(() => {
        const storedLocale = localStorage.getItem('selectedLocale');
        if (storedLocale) {
            setSelectedLocale(storedLocale);
        } else {
            setSelectedLocale('ko_KR');
        }
    }, []);

    useEffect(() => {
        if (selectedLocale) {
            localStorage.setItem('selectedLocale', selectedLocale);
        }
    }, [selectedLocale]);

    // if(selectedLocale == 'ko_KR') {
    //     localeImg = koFlag;
    // } else if (selectedLocale == 'en_US') {
    //     localeImg = enFlag;
    // } else {
    //     localeImg = jpFlag;
    // }

    return (
        // <div className="relative flex w-[60px] h-[44px] cursor-pointer" onClick={localeClicked}>
        //     <Image className="rounded-[50%] my-[13.5px] border border-[#505050]" src={localeImg} width={18} height={18} alt="locale"/>
        <div className="relative w-[60px] cursor-pointer pr-[20px]" onClick={localeClicked}>
            <Image src={isLoginPage ? iconLanguageBlack : iconLanguageWhite} width={20} height={20} alt="locale"/>
            {isClicked ? 
                // <div className="absolute w-[100px] h-[120px] rounded-[12px] right-2 top-[52px] bg-white border border-[#cfcdcd] z-50">
                <div className="absolute w-[100px] h-[120px] rounded-[12px] right-[36px] top-[28px] bg-white border border-[#cfcdcd] z-50">
                    <div className="flex items-center w-full h-[40px] p-[10px] rounded-t-[12px] hover:bg-[#F1F0F1]" onClick={localeSelected("ko_KR")}>
                        <Image className="rounded-[50%] h-[18px] border border-[#505050]" src={koFlag} width={18} height={18} alt="ko"/>
                        <p className="pl-[10px] text-[#505050] text-sm font-medium">한국어</p>
                    </div>
                    <div className="flex items-center w-full h-[40px] p-[10px] border-y border-[#ebebeb] hover:bg-[#F1F0F1]" onClick={localeSelected("en_US")}>
                        <Image className="rounded-[50%] h-[18px] border border-[#505050]" src={enFlag} width={18} height={18} alt="en"/>
                        <p className="pl-[10px] text-[#505050] text-sm font-medium">English</p>
                    </div>
                    <div className="flex items-center w-full h-[40px] p-[10px] rounded-b-[12px] hover:bg-[#F1F0F1]" onClick={localeSelected("ja_JP")}>
                        <Image className="rounded-[50%] h-[18px] border border-[#505050]" src={jpFlag} width={18} height={18} alt="ja"/>
                        <p className="pl-[10px] text-[#505050] text-sm font-medium">日本語</p>
                    </div>
                </div> 
            : ""}
            {/* <Image src={bottomArrow} width={36} height={44} alt="bottom_arrow" /> */}
        </div>
    );
}
