import React, { useState } from "react";
import Select, { components } from "react-select";
import Image from "next/image";
import { useRouter } from "next/router";

// image
import IconFilter from "./../../../../public/images/icons/table/filter.svg";
import IconFilterActive from "./../../../../public/images/icons/table/filter_active.svg";

const DropdownIndicator = (props) => {
  const isOpen = props.selectProps.menuIsOpen;
  return (
    <components.DropdownIndicator {...props}>
      <Image
        src={!isOpen ? IconFilter : IconFilterActive}
        alt="dropdown-icon"
        width={34}
        height={34}
      />
    </components.DropdownIndicator>
  );
};

const FilterSelect = ({ filterOption, onchange }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const [value, setValue] = useState(null);

  const customStyles = {
    option: (provided) => ({
      ...provided,
      color: "#000000",
      backgroundColor: "#ffffff",
      "&:hover": {
        backgroundColor: "#eff0ff",
        borderRadius: "0px",
      },
    }),
    control: (provided) => ({
      ...provided,
      width: `110px`,
      height: "34px",
      minHeight: "34px",
    }),
    menu: (provided) => ({
      ...provided,
      width: `110px`,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0",
      width: "34px",
      height: "34px",
    }),
  };

  return (
    <Select
      styles={customStyles}
      closeMenuOnSelect={true}
      classNamePrefix="select"
      isClearable={false}
      isSearchable={false}
      name="filter"
      options={filterOption}
      placeholder="filter"
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator,
      }}
      value={value} // 선택된 값을 반영
      onChange={(selectedOption) => {
        setValue(selectedOption); // 전체 객체를 설정
        onchange(selectedOption.value); // 선택된 값 전달
      }}
    />
  );
};

export default FilterSelect;
