import React from "react";
export default function UserBubble({ content }) {
  return (
    <div className="user-bubble bg-blue-500 text-white px-4 py-2 rounded-lg my-2 ml-auto max-w-[80%]">
      {content}
    </div>
  );
}
