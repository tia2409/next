import React, { useState } from "react";
import Select from "react-select";
import styles from "./";

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

export default function BasicSelect({Searchable = true, Disabled = false, Reverse = false }) {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(Searchable);
  const [isDisabled, setIsDisabled] = useState(Disabled);
  const [isLoading, setIsLoading] = useState(false); // 로딩 추가시 사용
  const [isRtl, setIsRtl] = useState(Reverse);

  // styles prop
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#ffffff" : "#000000", // 선택된 옵션
      backgroundColor: state.isSelected // 선택된 옵션
        ? "#2684ff"
        : state.isFocused // 포커스된 옵션
        ? ""
        : "#ffffff", 
      "&:hover": { // hover
        backgroundColor: "#c9c9c9",
        color: "#ffffff",
      },
    }),
  };

  return (
    <>
      <Select
        id="basic-select"
        className='w-[360px]'
        styles={customStyles}
        classNamePrefix="select"
        defaultValue={options[0]}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="color"
        options={options}
      />
    </>
  );
}
