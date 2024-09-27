import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function index({ onchange, starDate, endDate }) {
  const [selectDate, setSelectDate] = useState(new Date());
  return (
    <div>
      <DatePicker
        selected={selectDate}
        dateFormat="yyyy.MM.dd"
        shouldCloseOnSelect
        onChange={(date) => {
          setSelectDate(date);
          onchange(date);
        }}
      />
    </div>
  );
}
export default index;
