import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

// image
import KoLocale from "./../../../../public/images/icons/locale/ko_flag.webp";
import EnLocale from "./../../../../public/images/icons/locale/en_flag.webp";
import JpLocale from "./../../../../public/images/icons/locale/jp_flag.webp";

// component
import useOutSideClick from "../../hooks/useOutSideClick";

export default function LocaleSelect() {
  const [selectedLocale, setSelectedLocale] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const { i18n } = useTranslation();
  const router = useRouter();
  let localeImg;
  const localeRef = useRef(null); // useOutSideClick이 실행되지 않을 영역 지정

  useOutSideClick(localeRef, () => {
    setIsClicked(false);
  });

  const localeClicked = () => {
    setIsClicked((prev) => !prev);
  };

  const localeSelected = (locale) => () => {
    setSelectedLocale(locale);
    i18n.changeLanguage(locale);
    router.push(router.pathname, router.asPath, { locale });
  };

  useEffect(() => {
    const storedLocale = localStorage.getItem("selectedLocale");
    if (storedLocale) {
      setSelectedLocale(storedLocale);
    } else {
      setSelectedLocale("ko");
    }
  }, []);

  useEffect(() => {
    if (selectedLocale) {
      localStorage.setItem("selectedLocale", selectedLocale);
    }
  }, [selectedLocale]);

  if (selectedLocale == "ko") {
    localeImg = KoLocale;
  } else if (selectedLocale == "en") {
    localeImg = EnLocale;
  } else {
    localeImg = JpLocale;
  }

  // locale JP 추가시 주석부분 해제, 동일부분 주석처리 전환
  return (
    <div
      className="relative flex justify-end items-center w-[44px] h-[44px] pr-[12px] cursor-pointer"
      onClick={localeClicked}
    >
      <Image
        className="flex items-center justify-center"
        src={localeImg}
        width={24}
        height={24}
        alt="locale"
      />
      {isClicked && (
        <div
          // className="absolute w-[100px] h-[122px] rounded-[12px] right-2 top-[52px] bg-white border border-gray05 z-50"
          className="absolute w-[100px] h-[82px] rounded-[12px] right-2 top-[52px] bg-white border border-gray05 z-50"
          ref={localeRef}
        >
          <div
            className="flex items-center w-full h-[40px] p-[10px] rounded-t-[12px] hover:bg-gray06"
            onClick={localeSelected("ko")}
          >
            <Image
              className=""
              src={KoLocale}
              width={20}
              height={20}
              alt="ko"
            />
            <p className="pl-[10px] text-gray03 font-medium">한국어</p>
          </div>
          <div
            // className="flex items-center w-full h-[40px] p-[10px] border-y border-gray05 hover:bg-gray06"
            className="flex items-center w-full h-[40px] p-[10px] border-t border-gray05 rounded-b-[12px] hover:bg-gray06"
            onClick={localeSelected("en")}
          >
            <Image src={EnLocale} width={20} height={20} alt="en" />
            <p className="pl-[10px] text-gray03 font-medium">English</p>
          </div>
          {/* <div
            className="flex items-center w-full h-[40px] p-[10px] rounded-b-[12px] hover:bg-gray06"
            onClick={localeSelected("jp")}
          >
            <Image src={JpLocale} width={20} height={20} alt="ja" />
            <p className="pl-[10px] text-gray03 font-medium">日本語</p>
          </div> */}
        </div>
      )}
    </div>
  );
}
