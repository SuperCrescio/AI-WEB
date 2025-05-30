// frontend/src/components/ProjectManager.jsx
import React, { useEffect, useState } from 'react';
import { listPrompts, createPrompt } from '../api';

export default function ProjectManager({ token, onSelect }) {
  const [prompts, setPrompts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!token) return;
    listPrompts(token).then(setPrompts);
  }, [token]);

  const handleCreate = async () => {
    if (!title || !content) return;
    const res = await createPrompt(title, content, token);
    if (res.prompt) {
      setPrompts(p => [...p, res.prompt]);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="p-4">
      <h3 className="font-bold mb-2">I tuoi progetti</h3>
      <ul className="mb-4 list-disc list-inside">
        {prompts.map((p) => (
          <li key={p.id}>
            <button className="underline" onClick={() => onSelect && onSelect(p)}>
              {p.title}
            </button>
          </li>
        ))}
      </ul>
      <h4 className="font-semibold mb-1">Nuovo progetto</h4>
      <input
        className="border px-2 py-1 w-full mb-2"
        placeholder="Titolo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border px-2 py-1 w-full mb-2"
        placeholder="Prompt"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="btn" onClick={handleCreate}>Salva</button>
    </div>
  );
}
