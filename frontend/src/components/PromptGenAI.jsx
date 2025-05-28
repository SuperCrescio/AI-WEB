// frontend/src/components/PromptGenAI.jsx
import React, { useState } from "react";
export default function PromptGenAI({ onGenerate }) {
  const [input, setInput] = useState("");
  return (
    <div className="my-3">
      <input
        className="border rounded p-2 w-full"
        placeholder="Descrivi la tua App e genera il Prompt..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button
        className="btn mt-1"
        onClick={() => {
          onGenerate("Prompt generato automaticamente per: " + input);
          setInput("");
        }}
      >
        Genera da AI
      </button>
    </div>
  );
}
