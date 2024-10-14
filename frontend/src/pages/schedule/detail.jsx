import React, { useEffect, useState } from "react";
import moment from "moment";

// component
import CustomTable from "@/component/CustomTable";
import useFormData from "@/component/hooks/useFormData";
import DatePicker from "@/component/Select/DatePicker";

export default function Detail() {
  useFormData();
  const [scheduleDt, setScheduleDt] = useState(null);
  const [headerData, setHeaderData] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let schedule_dt = sessionStorage.getItem("schedule_dt");

    if (!schedule_dt) {
      schedule_dt = moment().format("YYYY-MM-DD");
    }
    setScheduleDt(schedule_dt);

    const fetchData = async () => {
      try {
        // header 렌더링
        const responseHeader = await fetch("/data/schedule_header.json");
        const resultHeader = await responseHeader.json();
        setHeaderData(resultHeader);
        // body 렌더링
        const responseBody = await fetch("/data/schedule_sample.json");
        const resultBody = await responseBody.json();
        setData(resultBody);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching JSON data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddCell = () => {
    if (data) {
      const newRow = {
        // 새로운 데이터 구조에 맞게 값을 설정하세요
        id: data.items.length + 1, // 예시로 ID를 생성
        work_status: "Y", // 기본값
        start_time: "", // 기본값
        end_time: "", // 기본값
        work_time: "", // 기본값
        work_detail: "", // 기본값
        schedule_note: "", // 기본값
      };

      setData((prevData) => ({
        ...prevData,
        items: [...prevData.items, newRow], // 기존 데이터에 추가
      }));
    }
  };
  // 셀 삭제 함수
  const handleDeleteCell = () => {
    if (data && data.items.length > 0) {
      // 마지막 아이템 삭제
      const newData = { ...data, items: data.items.slice(0, -1) };
      setData(newData);
    }
  };

  return (
    <div className="w-full">
      <DatePicker value={scheduleDt} />
      <button
        onClick={handleAddCell}
        className="p-2 mb-4 text-white bg-blue-500 rounded"
      >
        셀 추가
      </button>
      <button
        onClick={handleDeleteCell}
        className="p-2 mb-4 text-white bg-blue-500 rounded"
      >
        셀 삭제
      </button>
      {data && headerData && (
        <CustomTable
          headers={headerData.headers}
          data={data.items}
          paginationEnabled={false}
          checkEnabled={false}
          headerVisible={false}
        />
      )}
    </div>
  );
}
