import React, { useState } from "react";
import Select, { components } from "react-select";
import Image from "next/image";
import IconSelected from "./../../../../public/images/icons/select/selected.svg";
import IconSelectedActive from "./../../../../public/images/icons/select/selected-active.svg";
import filter from "./../../../../public/images/icons/table/icon-filter.svg";
import filterActive from "./../../../../public/images/icons/table/icon-filter-active.svg";
import { useRouter } from "next/router";

const CustomOption = (props) => {
  const isSelected = props.isSelected;

  return (
    <components.Option {...props}>
      <div className="relative flex items-center">
        <Image
          src={isSelected ? IconSelectedActive : IconSelected}
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

const DropdownIndicator = (props) => {
  const isOpen = props.selectProps.menuIsOpen;
  return (
    <components.DropdownIndicator {...props}>
      <Image
        src={!isOpen ? filter : filterActive}
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
        Option: CustomOption,
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
