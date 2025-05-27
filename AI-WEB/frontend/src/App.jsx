import React, { useState, useEffect } from "react";
import { PromptEditor, PromptDropdown, PromptGenAI, PreviewPanel, UniversalUploader, NotificationStack } from "./components";
import { sendAIMessage, listFiles, uploadFile } from "./api";
import "./styles.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("jwellness.md");
  const [promptList, setPromptList] = useState(["jwellness.md", "quizapp.md", "crm.md"]);
  const [output, setOutput] = useState("");
  const [files, setFiles] = useState([]);
  const [token, setToken] = useState(""); // Usa auth.js per login reale!
  const [notifications, setNotifications] = useState([]);

  // Carica prompt demo iniziali (puoi migliorare con fetch directory /src/prompts!)
  useEffect(() => {
    fetch(`/src/prompts/${selectedPrompt}`)
      .then(r => r.text())
      .then(txt => setPrompt(txt));
  }, [selectedPrompt]);

  // Carica files utente
  useEffect(() => {
    if (token) listFiles(token).then(setFiles);
  }, [token, output]);

  // Notifiche helper
  const notify = (msg, type = "info") =>
    setNotifications(n => [...n, { id: Date.now(), message: msg, type }]);

  // Caricamento file e refresh lista
  const handleUpload = async file => {
    if (!file) return;
    try {
      await uploadFile(file, token);
      notify("File caricato!", "success");
      setFiles(await listFiles(token));
    } catch {
      notify("Errore upload!", "error");
    }
  };

  // Generazione AI-APP in tempo reale
  const handleGenerate = async () => {
    try {
      setOutput("...generazione AI in corso...");
      const result = await sendAIMessage({ prompt, filenames: files }, token);
      setOutput(result);
      notify("UI generata da AI!", "success");
    } catch (err) {
      setOutput("");
      notify("Errore AI: " + err.message, "error");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* COLONNA PROMPT EDITOR */}
      <aside className="w-1/3 bg-gray-50 dark:bg-gray-900 border-r px-4 py-6 flex flex-col">
        <PromptDropdown
          promptList={promptList}
          selectedPrompt={selectedPrompt}
          onSelect={setSelectedPrompt}
        />
        <PromptEditor value={prompt} onChange={setPrompt} />
        <PromptGenAI onGenerate={setPrompt} />
        <UniversalUploader onUpload={handleUpload} />
        <button className="btn my-3" onClick={handleGenerate}>Genera AI-APP</button>
      </aside>
      {/* COLONNA PREVIEW */}
      <main className="flex-1 px-8 py-6">
        <PreviewPanel output={output} />
      </main>
      <NotificationStack notifications={notifications} onClose={id => setNotifications(n => n.filter(x => x.id !== id))} />
    </div>
  );
}

export default App;
