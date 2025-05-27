import React from "react";
export default function Text({ content }) {
  return (
    <div className="text-bubble bg-gray-50 dark:bg-gray-800 rounded px-3 py-2 my-2">
      {content}
    </div>
  );
}
