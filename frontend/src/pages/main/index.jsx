import useFormData from "@/component/hooks/useFormData";
import React, { useState, useEffect } from "react";
import DataTable from "@/component/DataTable";

export default function Main() {
  useFormData();
  const [selection, setSelection] = useState([]);
  const [data, setData] = useState(null); // JSON 데이터를 상태로 관리
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    // JSON 파일을 동적으로 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json"); // public 폴더에 위치한 JSON 파일
        const result = await response.json();
        setData(result); // 가져온 데이터를 상태에 저장
        setLoading(false); // 데이터 로드 완료
      } catch (error) {
        console.error("Error fetching JSON data:", error);
        setLoading(false); // 에러 발생 시에도 로딩 상태를 false로 설정
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(selection);
  }, [selection]);

  // 로딩 중일 때 로딩 메시지 표시
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 데이터가 없는 경우 처리
  if (!data || !data.headers || !data.items) {
    return <div>데이터가 없습니다.</div>;
  }

  // 데이터가 로드된 후에만 DataTable 컴포넌트를 렌더링
  return (
    <div>
      <div>index</div>
      {data && (
        <DataTable
          headers={data.headers}
          items={data.items}
          selectable={true}
          updateSelection={setSelection}
          pagination={true}
          itemsPerPage={10}
          itemKey="item_cd"
        />
      )}
    </div>
  );
}
