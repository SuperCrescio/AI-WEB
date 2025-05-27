// frontend/src/components/Switch.jsx
import React from "react";
export default function Switch({ checked, onChange, label }) {
  return (
    <label className="switch inline-flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={!!checked}
        onChange={e => onChange && onChange(e.target.checked)}
        className="hidden"
      />
      <span
        className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ${checked ? "bg-blue-500" : "bg-gray-300"} ${!checked ? "dark:bg-gray-600" : ""}`}
      >
        <span
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${checked ? "translate-x-4" : ""}`}
        ></span>
      </span>
      {label && <span className="ml-2">{label}</span>}
    </label>
  );
}
