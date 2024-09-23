import useFormData from "@/component/hooks/useFormData";
import React, { useState } from "react";

export default function Index() {
  useFormData();
  const [data, setData] = useState(""); // useState 수정

  return (
    <div className="w-full p-4" style={{ height: "calc(100% - 41px)" }}>
      <input
        id="plz2"
        onChange={(event) => setData(event.target.value)}
        value={data}
      />
      <div>{data}</div>
    </div>
  );
}
