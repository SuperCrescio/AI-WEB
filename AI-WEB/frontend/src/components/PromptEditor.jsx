// frontend/src/components/PromptEditor.jsx
import React from "react";
export default function PromptEditor({ value, onChange }) {
  return (
    <textarea
      className="w-full h-72 border rounded p-2 text-sm font-mono resize-vertical my-2"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Scrivi il tuo prompt AI-APP qui..."
      spellCheck={false}
    />
  );
}
