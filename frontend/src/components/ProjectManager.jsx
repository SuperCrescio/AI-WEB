// frontend/src/components/ProjectManager.jsx
import React, { useEffect, useState } from 'react';

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(saved);
  }, []);

  const addProject = () => {
    if (!title.trim()) return;
    const newProj = { id: Date.now(), title };
    const updated = [...projects, newProj];
    setProjects(updated);
    localStorage.setItem('projects', JSON.stringify(updated));
    setTitle('');
  };

  const removeProject = id => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('projects', JSON.stringify(updated));
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Progetti</h3>
      <div className="flex gap-2 mb-3">
        <input
          className="border px-2 py-1 flex-1"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Nuovo progetto"
        />
        <button className="btn" onClick={addProject}>Aggiungi</button>
      </div>
      <ul className="space-y-1">
        {projects.map(p => (
          <li key={p.id} className="flex justify-between items-center">
            <span>{p.title}</span>
            <button className="text-red-500" onClick={() => removeProject(p.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
