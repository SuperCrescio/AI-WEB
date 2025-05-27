// frontend/src/components/Dropdown.jsx
import React from "react";
export default function Dropdown({ options, value, onSelect, label }) {
  if (!Array.isArray(options)) return null;
  return (
    <div className="my-2">
      {label && <label className="block mb-1">{label}</label>}
      <select
        className="border rounded px-2 py-1"
        value={value || ""}
        onChange={e => onSelect && onSelect(e.target.value)}
      >
        <option value="" disabled>Seleziona...</option>
        {options.map((opt, i) => (
          <option key={i} value={typeof opt === "string" ? opt : opt.value}>
            {typeof opt === "string" ? opt : (opt.label || opt.value)}
          </option>
        ))}
      </select>
    </div>
  );
}
