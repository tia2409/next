import React from "react";
import CustomFullCalendar from "@/component/FullCalendar";
import { useRouter } from "next/router";
import moment from "moment";

export default function Index() {
  const router = useRouter();

  const handleDateClick = (selectedDateInfo) => {
    sessionStorage.setItem(
      "schedule_dt",
      moment(selectedDateInfo.date).format("YYYY-MM-DD")
    );
    router.push("/schedule/detail");
  };

  return (
    <div>
      <CustomFullCalendar onDateClick={handleDateClick} />
    </div>
  );
}
