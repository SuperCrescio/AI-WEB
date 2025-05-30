// frontend/src/api.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Genera l'interfaccia AI (prompt + elenco file)
export async function sendAIMessage({ prompt, fileIds = [] }, token) {
  const res = await fetch(`${API_URL}/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ promptContent: prompt, fileIds }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.message;
}

// Analizza un file tramite AI
export async function analyzeFile({ filename }, token) {
  const res = await fetch(`${API_URL}/ai/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ filename }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.analysis;
}

// Lista file utente
export async function listFiles(token) {
  const res = await fetch(`${API_URL}/files`, {
    headers: { ...(token && { Authorization: `Bearer ${token}` }) },
  });
  const json = await res.json();
  return json.files || [];
}

// Upload di un file
export async function uploadFile(file, token) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_URL}/files`, {
    method: "POST",
    headers: { ...(token && { Authorization: `Bearer ${token}` }) },
    body: formData,
  });
  return await res.json();
}

// Prompt API
export async function listPrompts(token) {
  const res = await fetch(`${API_URL}/prompts`, {
    headers: { ...(token && { Authorization: `Bearer ${token}` }) }
  });
  const data = await res.json();
  return data.prompts || [];
}

export async function createPrompt(title, content, token) {
  const res = await fetch(`${API_URL}/prompts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify({ title, content })
  });
  return await res.json();
}

export async function updatePrompt(id, title, content, token) {
  const res = await fetch(`${API_URL}/prompts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify({ title, content })
  });
  return await res.json();
}

// Registrazione utente
export async function registerUser(email, password) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await res.json();
}

// Login utente
export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await res.json();
}
