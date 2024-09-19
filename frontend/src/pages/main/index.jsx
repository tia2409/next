import useFormData from "@/component/hooks/useFormData";
import React from "react";

export default function Main() {
  useFormData();
  return (
    <div className="w-full p-4 h-[100% - 41px]">
      <div>index</div>
      <input id="plz" />
    </div>
  );
}
