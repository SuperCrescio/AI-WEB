import React from "react";
export default function Stepper({ steps = [], active = 0, onSelect }) {
  if (!Array.isArray(steps)) return null;
  return (
    <div className="stepper flex items-center gap-2 my-2">
      {steps.map((step, idx) => (
        <div key={idx} className={`flex flex-col items-center`}>
          <button
            className={`rounded-full w-8 h-8 flex items-center justify-center ${idx === active ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}
            onClick={() => onSelect && onSelect(idx)}
          >
            {typeof step === "string" ? step[0] : step.label || idx + 1}
          </button>
          {typeof step === "string" ? (
            <div className="text-xs mt-1">{step}</div>
          ) : (
            <div className="text-xs mt-1">{step.label || ""}</div>
          )}
        </div>
      ))}
    </div>
  );
}
