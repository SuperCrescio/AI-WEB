import React from "react";
export default function Card({ title, content, ...rest }) {
  return (
    <div className="card-bubble bg-gray-100 dark:bg-gray-700 rounded p-4 mb-3 shadow">
      {title && <h3 className="font-semibold text-lg mb-1">{title}</h3>}
      <div>{content || rest.children}</div>
    </div>
  );
}
