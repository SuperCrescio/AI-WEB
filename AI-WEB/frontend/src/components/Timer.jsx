// frontend/src/components/Timer.jsx
import React, { useState, useEffect } from "react";
export default function Timer({ initial = 60, label, onComplete }) {
  const [seconds, setSeconds] = useState(initial);
  useEffect(() => {
    if (seconds <= 0) {
      onComplete && onComplete();
      return;
    }
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, onComplete]);
  return (
    <div className="timer ai bg-gray-200 dark:bg-gray-700 rounded p-2 mb-2 font-mono text-sm text-center">
      {label && <div className="mb-1">{label}</div>}
      <span>{seconds}s</span>
    </div>
  );
}
