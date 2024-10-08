import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import Image from "next/image";
import { useTranslation } from "react-i18next";

// image
import IconSelected from "./../../../../public/images/icons/select/selected.svg";
import IconSelectedActive from "./../../../../public/images/icons/select/selected_active.svg";
import IconDownBlack from "./../../../../public/images/icons/arrow/down_black.svg";
import IconDownBlackActive from "./../../../../public/images/icons/arrow/down_blue.svg";
import IconSearchActive from "./../../../../public/images/icons/input/search_active.svg";

// Custom option
const CustomOption = (props) => {
  const isSelected = props.isSelected;
  const isAllSelected = props.selectProps.isAllSelected;

  const icon =
    props.data.value === "all"
      ? isAllSelected
        ? IconSelectedActive
        : IconSelected
      : isSelected
      ? IconSelectedActive
      : IconSelected;

  return (
    <components.Option {...props}>
      <div className="relative flex items-center">
        <Image
          src={icon}
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

const CustomValueContainer = ({ children, ...props }) => {
  const { t } = useTranslation();
  const selectedCount = props.getValue().length;
  const { placeHolder } = props;

  return (
    <components.ValueContainer {...props}>
      {selectedCount > 0 ? (
        <span className="mx-0.5">
          {selectedCount}
          {t("common.selectCount")}
        </span>
      ) : (
        placeHolder
      )}
      {children[1]}
    </components.ValueContainer>
  );
};

const CustomDropdownIndicator = (props) => {
  const { menuIsOpen, isSearchable } = props.selectProps;
  const icon = menuIsOpen
    ? isSearchable
      ? IconSearchActive
      : IconDownBlackActive
    : IconDownBlack;

  return (
    <components.DropdownIndicator {...props}>
      <Image src={icon} alt="dropdown" width={34} height={34} />
    </components.DropdownIndicator>
  );
};

export default function BasicSelect({
  Searchable = false,
  Disabled = false,
  Reverse = false,
  width = 230,
  deleteOption = false,
  placeHolder,
  options,
  onchange,
  inputId,
  defaultSelectValue,
  type = "other",
}) {
  const [selectedOption, setSelectedOption] = useState(defaultSelectValue);
  const [tempSelectedOption, setTempSelectedOption] =
    useState(defaultSelectValue);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const [isClearable, setIsClearable] = useState(deleteOption);
  const [isSearchable, setIsSearchable] = useState(Searchable);
  const [isDisabled, setIsDisabled] = useState(Disabled);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(Reverse);
  const [isSelectType, setIsSelectType] = useState(type);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "#000000",
      backgroundColor: state.isFocused ? "#f0f0f0" : "#ffffff",
      "&:hover": {
        backgroundColor: "#eff0ff",
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
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: 0,
    }),
  };

  // 전체 선택 옵션 확인 및 처리
  const handleChange = (selected) => {
    const isMultiSelect = Array.isArray(selected);
    if (isMultiSelect) {
      if (selected.some((option) => option.value === "all")) {
        if (isAllSelected) {
          setTempSelectedOption([]);
          setIsAllSelected(false);
        } else {
          const allOptions = options.filter((opt) => opt.value !== "all");
          setTempSelectedOption(allOptions);
          setIsAllSelected(true);
        }
      } else {
        setTempSelectedOption(selected);
        setIsAllSelected(selected.length === options.length);
      }
    } else {
      setTempSelectedOption([selected]);
      setIsAllSelected(selected.value === "all");
    }
  };

  const handleConfirm = () => {
    setSelectedOption(tempSelectedOption);
    setMenuIsOpen(false);
    if (onchange) {
      onchange(tempSelectedOption);
    }
  };

  const handleCancel = () => {
    setTempSelectedOption(selectedOption);
    setMenuIsOpen(false);
  };

  useEffect(() => {
    const savedData = sessionStorage.getItem(inputId);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const matchedOptions = options.filter((opt) =>
        parsedData.includes(opt.value)
      );
      setSelectedOption(matchedOptions);
      setTempSelectedOption(matchedOptions);
    } else {
      // sessionStorage에 값이 없을 경우 defaultSelectValue로 설정
      setSelectedOption(defaultSelectValue);
      setTempSelectedOption(defaultSelectValue);
    }
  }, [inputId, options, defaultSelectValue]);

  return (
    <Select
      styles={customStyles}
      closeMenuOnSelect={isSelectType === "multi" ? false : true}
      classNamePrefix="select"
      isDisabled={isDisabled}
      isLoading={isLoading}
      isClearable={isClearable}
      isRtl={isRtl}
      isSearchable={isSearchable}
      instanceId={inputId}
      className={inputId}
      name={inputId}
      options={[
        ...(isSelectType === "multi"
          ? [{ value: "all", label: "전체 선택" }]
          : []),
        ...options,
      ]}
      placeholder={placeHolder}
      isMulti={isSelectType === "multi"}
      components={{
        IndicatorSeparator: () => null,
        Option:
          isSelectType === "check" || isSelectType === "multi"
            ? CustomOption
            : components.Option,
        ValueContainer:
          isSelectType === "multi"
            ? CustomValueContainer
            : components.ValueContainer,
        DropdownIndicator: CustomDropdownIndicator,
      }}
      hideSelectedOptions={false}
      value={tempSelectedOption}
      onChange={handleChange}
      inputId={inputId}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      menuIsOpen={menuIsOpen}
      onMenuOpen={() => setMenuIsOpen(true)}
      onMenuClose={() => setMenuIsOpen(false)}
      isAllSelected={isAllSelected}
    />
  );
}
