// frontend/src/components/Slider.jsx
import React from "react";
export default function Slider({ min = 0, max = 100, step = 1, value, onChange, label }) {
  return (
    <div className="slider-bubble mb-2">
      {label && <div className="font-medium mb-1">{label}: <span className="font-bold">{value}</span></div>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        className="w-full"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
    </div>
  );
}
