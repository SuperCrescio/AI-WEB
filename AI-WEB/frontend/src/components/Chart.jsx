// frontend/src/components/Chart.jsx
import React from "react";
export default function Chart({ data, labels, title, type = "bar", ...rest }) {
  if (!Array.isArray(data) || !Array.isArray(labels)) {
    return <div className="chart-bubble text-xs text-gray-500">Dati chart non validi</div>;
  }
  return (
    <div className="chart-bubble p-4 bg-gray-50 dark:bg-gray-800 rounded shadow mb-3">
      {title && <div className="font-semibold mb-1">{title}</div>}
      <div className="flex gap-1 items-end h-32">
        {data.map((val, i) => (
          <div
            key={i}
            style={{
              height: `${(val / Math.max(...data)) * 100}%`,
              width: "20px",
              background: "#3b82f6",
              borderRadius: "6px 6px 0 0",
              transition: "height .2s"
            }}
            title={`${labels[i]}: ${val}`}
          >
            <span className="block text-xs mt-2 text-center" style={{ writingMode: "vertical-lr" }}>
              {labels[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
