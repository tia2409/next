import React, { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import Image from "next/image";
import styles from "./index.module.css";
import { getMonth, getYear } from "date-fns";

// image
import IconCalendar from "../../../../public/images/icons/input/calendar.svg";
import IconLeftBlack from "../../../../public/images/icons/arrow/left_black.svg";
import IconRightBlack from "../../../../public/images/icons/arrow/right_black.svg";

function DateSelect({ onchange, startDate, endDate, customId }) {
  const [selectDate, setSelectDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("day"); // "day", "month", "year" 모드 관리
  function getYearRange(selectedYear) {
    // 12년 단위로 보여질 연도 범위를 계산
    const startYear = selectedYear - ((selectedYear - 1) % 12);
    const endYear = startYear + 11;

    // 연도 범위 배열 생성
    const years = [startYear, endYear];

    return years;
  }

  // 날짜 선택 모드를 변경하는 함수
  const toggleViewMode = () => {
    if (viewMode === "day") {
      setViewMode("month");
    } else if (viewMode === "month") {
      setViewMode("year");
    } else {
      setViewMode("day");
    }
  };
  const CustomInput = forwardRef(({ value, onClick, className }, ref) => (
    <input
      id={customId}
      className={className}
      onClick={onClick}
      ref={ref}
      value={value}
    />
  ));
  // 선택한 날짜가 변경될 때마다 날짜 모드를 다시 "day"로 설정
  useEffect(() => {
    if (viewMode === "year") {
      setViewMode("month");
    } else if (viewMode === "month") {
      setViewMode("day");
    }
  }, [selectDate]);

  // startDate, endDate 범위 내에서 선택된 날짜가 유지되도록 설정
  useEffect(() => {
    if (startDate && selectDate < startDate) {
      setSelectDate(startDate);
    }
    if (endDate && selectDate > endDate) {
      setSelectDate(endDate);
    }
  }, [startDate, endDate, selectDate]);

  return (
    <label className="flex relative w-[130px] h-[34px]">
      <DatePicker
        id={customId}
        className="datePicker"
        selected={selectDate}
        dateFormat={"yyyy-MM-dd"}
        closeOnScroll={true}
        showYearPicker={viewMode === "year"}
        showMonthYearPicker={viewMode === "month"}
        minDate={startDate}
        maxDate={endDate}
        onChange={(date) => {
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const formatDate = `${year}-${month}-${day}`;
          setSelectDate(date);
          onchange(formatDate);
        }}
        customInput={<CustomInput />}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          decreaseYear,
          increaseYear,
          decreaseYearRange,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className={styles.customHeaderContainer}>
            <div>
              <button
                type="button"
                onClick={viewMode === "day" ? decreaseMonth : decreaseYear}
                className={styles.monthButton}
                disabled={prevMonthButtonDisabled}
              >
                <Image src={IconLeftBlack} alt="leftArrow" />
              </button>
            </div>
            <div className={styles.toggleViewMode} onClick={toggleViewMode}>
              {viewMode === "day" && (
                <span className={styles.month}>
                  {getYear(date)}년 {getMonth(date) + 1}월
                </span>
              )}
              {viewMode === "month" && (
                <span className={styles.year}>{getYear(date)}년</span>
              )}
              {viewMode === "year" && (
                <span className={styles.year}>
                  {getYearRange(getYear(date))[0]}년 ~{" "}
                  {getYearRange(getYear(date))[1]}년
                </span>
              )}
            </div>
            <div>
              <button
                type="button"
                onClick={viewMode === "day" ? increaseMonth : increaseYear}
                className={styles.monthButton}
                disabled={nextMonthButtonDisabled}
              >
                <Image src={IconRightBlack} alt="rightArrow" />
              </button>
            </div>
          </div>
        )}
      />
      <Image
        src={IconCalendar}
        alt="IconCalendar"
        width={34}
        height={34}
        className="absolute top-0 right-0"
      />
    </label>
  );
}

export default DateSelect;
