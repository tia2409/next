import useFormData from "@/component/hooks/useFormData";
import React from "react";

export default function index() {
  useFormData();
  return (
    <div className="w-full p-4 h-[100% - 41px]">
      <div>index3</div>
      <input type="text" id="plz4" />
    </div>
  );
}
