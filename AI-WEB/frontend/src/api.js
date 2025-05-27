const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function sendAIMessage({ prompt, filenames = [] }, token) {
  const res = await fetch(`${API_URL}/ai/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ prompt, filenames }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

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

export async function listFiles(token) {
  const res = await fetch(`${API_URL}/file/list`, {
    headers: { ...(token && { Authorization: `Bearer ${token}` }) },
  });
  return (await res.json()).files || [];
}

export async function uploadFile(file, token) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_URL}/file/upload`, {
    method: "POST",
    headers: { ...(token && { Authorization: `Bearer ${token}` }) },
    body: formData,
  });
  return await res.json();
}
