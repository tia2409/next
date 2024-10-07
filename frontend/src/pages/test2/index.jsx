import React, { useState } from "react";

// component
import useFormData from "@/component/hooks/useFormData";
import DatePicker from "@/component/Select/DatePicker";

export default function index() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  useFormData();
  return (
    <div className="w-full p-4 h-[100% - 41px]">
      <div>{startDate}</div>
      <DatePicker onchange={setStartDate} customId="startDt" />
      <DatePicker onchange={setEndDate} customId="endDt" />
    </div>
  );
}
