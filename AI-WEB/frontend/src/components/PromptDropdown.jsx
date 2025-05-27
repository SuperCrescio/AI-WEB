import React from "react";
export default function PromptDropdown({ promptList, selectedPrompt, onSelect }) {
  return (
    <select
      className="w-full border rounded p-2 my-2"
      value={selectedPrompt}
      onChange={e => onSelect(e.target.value)}
    >
      {promptList.map(p => (
        <option key={p} value={p}>{p.replace(".md", "")}</option>
      ))}
      <option value="+">+ Nuovo prompt</option>
    </select>
  );
}
