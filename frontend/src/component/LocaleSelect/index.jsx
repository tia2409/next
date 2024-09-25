import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import KoLocale from "./../../../public/images/icons/locale/ko-flag.webp";
import EnLocale from "./../../../public/images/icons/locale/en-flag.webp";
import JpLocale from "./../../../public/images/icons/locale/jp-flag.webp";

export default function LocaleSelect() {
    const [selectedLocale, setSelectedLocale] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const { i18n } = useTranslation();
    const router = useRouter();
    const isLoginPage = router.pathname === "/";
    let localeImg;

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

    if(selectedLocale == 'ko_KR') {
        localeImg = KoLocale;
    } else if (selectedLocale == 'en_US') {
        localeImg = EnLocale;
    } else {
        localeImg = JpLocale;
    }

    return (
        <div className="relative flex justify-end w-[44px] h-[44px] pr-[12px] cursor-pointer" onClick={localeClicked}>
            <Image className="rounded-[50%] my-[13.5px] border border-gray03" src={localeImg} width={18} height={18} alt="locale"/>
            {isClicked ? 
                <div className="absolute w-[100px] h-[122px] rounded-[12px] right-2 top-[52px] bg-white border border-gray05 z-50">
                    <div className="flex items-center w-full h-[40px] p-[10px] rounded-t-[12px] hover:bg-gray06" onClick={localeSelected("ko_KR")}>
                        <Image className="rounded-[50%] h-[18px] border border-gray03" src={KoLocale} width={18} height={18} alt="ko"/>
                        <p className="pl-[10px] text-gray03 text-sm font-medium">한국어</p>
                    </div>
                    <div className="flex items-center w-full h-[40px] p-[10px] border-y border-gray05 hover:bg-gray06" onClick={localeSelected("en_US")}>
                        <Image className="rounded-[50%] h-[18px] border border-gray03" src={EnLocale} width={18} height={18} alt="en"/>
                        <p className="pl-[10px] text-gray03 text-sm font-medium">English</p>
                    </div>
                    <div className="flex items-center w-full h-[40px] p-[10px] rounded-b-[12px] hover:bg-gray06" onClick={localeSelected("ja_JP")}>
                        <Image className="rounded-[50%] h-[18px] border border-gray03" src={JpLocale} width={18} height={18} alt="ja"/>
                        <p className="pl-[10px] text-gray03 text-sm font-medium">日本語</p>
                    </div>
                </div> 
            : ""}
        </div>
    );
}
