import React from "react";
export default function ButtonsGroup({ options, selected, onSelect }) {
  if (!Array.isArray(options)) return null;
  return (
    <div className="buttons-group flex gap-2 my-3">
      {options.map((opt, i) => (
        <button
          key={i}
          className={`btn ${selected === opt ? "bg-blue-600 text-white" : ""}`}
          onClick={() => onSelect && onSelect(opt)}
        >
          {typeof opt === "string" ? opt : (opt.label || JSON.stringify(opt))}
        </button>
      ))}
    </div>
  );
}
