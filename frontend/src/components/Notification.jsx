// frontend/src/components/Notification.jsx
import React from "react";
export default function Notification({ type = "info", message, onClose }) {
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-400"
  };
  return (
    <div className={`rounded px-4 py-2 shadow text-white flex items-center gap-2 ${colors[type] || colors.info}`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-lg font-bold">×</button>
    </div>
  );
}
