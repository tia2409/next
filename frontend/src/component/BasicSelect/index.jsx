import React, { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./"; // 이 부분은 올바른 스타일 파일을 가져오도록 수정 필요

const Checkbox = ({ children, ...props }) => (
  <label style={{ marginRight: "1em" }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

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
}) {
  const [selectedOption, setSelectedOption] = useState(defaultSelectValue);

  const [isClearable, setIsClearable] = useState(deleteOption);
  const [isSearchable, setIsSearchable] = useState(Searchable);
  const [isDisabled, setIsDisabled] = useState(Disabled);
  const [isLoading, setIsLoading] = useState(false); // 로딩 추가시 사용
  const [isRtl, setIsRtl] = useState(Reverse);

  // customStyles 적용
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#ffffff" : "#000000",
      backgroundColor: state.isSelected
        ? "#2684ff"
        : state.isFocused
        ? "#f0f0f0"
        : "#ffffff",
      "&:hover": {
        backgroundColor: "#c9c9c9",
        color: "#ffffff",
      },
    }),
    control: (provided) => ({
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
    storedData[defaultSelectValue] = selected?.value; // 'color'는 react-select의 name 속성
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
    console.log(savedData, inputId, savedData?.[inputId]);
    if (savedData?.[inputId]) {
      const savedOption = options.find(
        (option) => option.value === savedData?.[inputId]
      );
      console.log("????", savedOption);
      setSelectedOption(savedOption);
    }
  }, []);

  return (
    <>
      <Select
        id="basic-select"
        styles={customStyles} // 여기서 styles를 제대로 전달
        classNamePrefix="select"
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name={inputId}
        options={options}
        placeholder={placeHolder}
        components={{
          IndicatorSeparator: () => null,
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
