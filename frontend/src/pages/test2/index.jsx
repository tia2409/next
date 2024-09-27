import useFormData from "@/component/hooks/useFormData";
import React, { useEffect, useState } from "react";
import DatePicker from "@/component/DatePicker";

export default function index() {
  const [startDate, setStartDate] = useState("");
  useFormData();
  return (
    <div className="w-full p-4 h-[100% - 41px]">
      <div>{startDate}</div>
      <DatePicker onchange={setStartDate} />
    </div>
  );
}
