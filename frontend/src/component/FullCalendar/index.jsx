import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function CustomFullCalendar({ onDateClick }) {
  const calendarRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (calendarRef.current) {
        calendarRef.current.getApi().updateSize(); // 요소 크기 변경 시 캘린더 크기 업데이트
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current); // div 사이즈 감지
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current); // 컴포넌트 언마운트 시 감지 정지
      }
    };
  }, []);

  return (
    <div ref={containerRef}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        fixedWeekCount={false}
        locale="ko"
        height="700px"
        headerToolbar={{
          start: "",
          center: "prev title next",
          end: "",
        }}
        dayCellContent={(arg) => arg.date.getDate()}
        dayCellDidMount={(info) => {
          const day = info.date.getDay();
          if (day === 0) {
            info.el.style.color = "#e9402a"; // 일요일
          } else if (day === 6) {
            info.el.style.color = "#27a4de"; // 토요일
          }
        }}
        dayHeaderContent={(args) => {
          const dayNames = [
            "일요일",
            "월요일",
            "화요일",
            "수요일",
            "목요일",
            "금요일",
            "토요일",
          ];
          return dayNames[args.date.getUTCDay()];
        }}
        dateClick={onDateClick} // 핸들러를 props로 전달받음
      />
    </div>
  );
}
