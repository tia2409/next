import React, { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import Image from "next/image";
import styles from "./index.module.css";
import { getMonth, getYear } from "date-fns";

// image
import IconCalendar from "../../../../public/images/icons/input/calendar.svg";
import IconLeftBlack from "../../../../public/images/icons/arrow/left_black.svg";
import IconRightBlack from "../../../../public/images/icons/arrow/right_black.svg";

function Index({ onchange, startDate, endDate, customId, value }) {
  const [selectDate, setSelectDate] = useState(
    value ? new Date(value) : new Date()
  );
  const [viewMode, setViewMode] = useState("day");

  useEffect(() => {
    if (value) {
      setSelectDate(new Date(value)); // 외부에서 전달된 value가 변경되면 반영
    }
  }, [value]);

  function getYearRange(selectedYear) {
    const startYear = selectedYear - ((selectedYear - 1) % 12);
    const endYear = startYear + 11;
    return [startYear, endYear];
  }

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

  useEffect(() => {
    if (viewMode === "year") {
      setViewMode("month");
    } else if (viewMode === "month") {
      setViewMode("day");
    }
  }, [selectDate]);

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
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className={styles.customHeaderContainer}>
            <button
              type="button"
              onClick={viewMode === "day" ? decreaseMonth : decreaseYear}
              className={styles.monthButton}
              disabled={prevMonthButtonDisabled}
            >
              <Image src={IconLeftBlack} alt="leftArrow" />
            </button>
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
            <button
              type="button"
              onClick={viewMode === "day" ? increaseMonth : increaseYear}
              className={styles.monthButton}
              disabled={nextMonthButtonDisabled}
            >
              <Image src={IconRightBlack} alt="rightArrow" />
            </button>
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

export default Index;
