import React from "react";
export default function Menu({ items = [], onSelect, label }) {
  if (!Array.isArray(items)) return null;
  return (
    <div className="menu bg-gray-100 dark:bg-gray-800 p-3 rounded my-2">
      {label && <div className="font-medium mb-1">{label}</div>}
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i}>
            <button
              className="w-full text-left py-1 px-2 rounded hover:bg-blue-100 dark:hover:bg-blue-800"
              onClick={() => onSelect && onSelect(item.value || item)}
            >
              {typeof item === "string" ? item : item.label || JSON.stringify(item)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
