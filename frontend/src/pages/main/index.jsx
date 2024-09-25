import React, { useState, useEffect } from "react";
import CustomTable from "../../component/CustomTable";
import useFormData from "@/component/hooks/useFormData";
import SearchBar from "@/component/SearchBar";

export default function index() {
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
  return (
    <div>
      <SearchBar>asdf</SearchBar>
      {data && <CustomTable headers={data.headers} data={data.items} />}
    </div>
  );
}
