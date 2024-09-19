import useFormData from "@/component/hooks/useFormData";
import React from "react";

export default function index() {
  useFormData();
  return (
    <div className="w-full p-4 h-[100% - 41px]">
      <div>index2</div>
      <input id="plz2" />
    </div>
  );
}
