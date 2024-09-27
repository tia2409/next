import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import Image from "next/image";

//image
import IconSelected from "./../../../public/images/icons/select/selected.svg";
import IconSelectedActive from "./../../../public/images/icons/select/selected-active.svg";

// Custom option component
const CustomOption = (props) => {
  const isSelected = props.isSelected; // 선택 여부 확인

  return (
    <components.Option {...props}>
      <div className="relative flex items-center">
        <Image
          src={isSelected ? IconSelectedActive : IconSelected} // 선택된 경우 체크 이미지
          className="absolute left-[-8px]"
          width={34}
          height={34}
          alt="selected"
        />
        <div className="pl-8">{props.data.label}</div>
      </div>
    </components.Option>
  );
};

export default function BasicSelect({
  Searchable = false,
  Disabled = false,
  Reverse = false,
  width = 360,
  deleteOption = true,
  placeHolder,
  options,
  onchange,
  inputId,
  defaultSelectValue,
  type,
}) {
  const [selectedOption, setSelectedOption] = useState(defaultSelectValue);

  const [isClearable, setIsClearable] = useState(deleteOption);
  const [isSearchable, setIsSearchable] = useState(Searchable);
  const [isDisabled, setIsDisabled] = useState(Disabled);
  const [isLoading, setIsLoading] = useState(false); // 로딩 추가시 사용
  const [isRtl, setIsRtl] = useState(Reverse);

  const [isSelectType, setIsSelectType] = useState(type || "");

  // customStyles 적용
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "#000000",
      backgroundColor: state.isFocused ? "#f0f0f0" : "#ffffff",
      "&:hover": {
        backgroundColor: "#F1F1F1",
        borderRadius: "0px",
      },
    }),
    control: (provided) => ({
      ...provided,
      width: `${width}px`,
    }),
    menu: (provided) => ({
      ...provided,
      width: `${width}px`,
    }),
  };
  // 선택된 값을 세션 스토리지에 저장하는 함수
  const handleChange = (selected) => {
    setSelectedOption(selected);

    // 세션 스토리지에 값 저장
    const storedData =
      JSON.parse(sessionStorage.getItem(window.location.pathname)) || {};
    storedData[inputId] = selected?.value;
    sessionStorage.setItem(
      window.location.pathname,
      JSON.stringify(storedData)
    );
  };

  // 세션 스토리지에서 값을 불러와서 복원하는 함수
  useEffect(() => {
    const savedData = JSON.parse(
      sessionStorage.getItem(window.location.pathname)
    );
    if (savedData?.[inputId]) {
      const savedOption = options.find(
        (option) => option.value === savedData?.[inputId]
      );
      setSelectedOption(savedOption);
    }
  }, []);

  return (
    <>
      <Select
        styles={customStyles}
        closeMenuOnSelect={isSelectType === "multi" ? false : true}
        classNamePrefix="select"
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name={inputId}
        options={options}
        placeholder={placeHolder}
        isMulti={isSelectType === "multi" ? true : false} // 다중선택 여부 결정
        components={{
          IndicatorSeparator: () => null,
          Option:
            isSelectType === "check" || "multi"
              ? CustomOption
              : components.Option,
        }}
        value={selectedOption}
        defaultValue={defaultSelectValue}
        onChange={(selectedOption) => {
          if (onchange) {
            onchange(selectedOption); // onchange 함수 호출
          }
          handleChange(selectedOption); // handleChange 함수 호출
        }}
        inputId={inputId}
      />
    </>
  );
}
