// frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import { PromptEditor, PromptDropdown, PromptGenAI, PreviewPanel, UniversalUploader, NotificationStack, ProjectManager } from "./components";
import { sendAIMessage, listFiles, uploadFile, loginUser, registerUser } from "./api";
import "./styles.css";

function App() {
  // Stati per login/registrazione
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("user") || "");
  const [authMessage, setAuthMessage] = useState("");

  // Stati per prompt e output
  const [prompt, setPrompt] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("jwellness.md");
  const [promptList] = useState(["jwellness.md", "quizapp.md", "crm.md"]);
  const [output, setOutput] = useState("");
  const [files, setFiles] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Seleziona prompt di esempio da file .md
  useEffect(() => {
    if (!selectedPrompt || selectedPrompt === "+") return;
    fetch(`/src/prompts/${selectedPrompt}`)
      .then(r => r.text())
      .then(txt => setPrompt(txt));
  }, [selectedPrompt]);

  // Carica lista file quando cambia token o output
  useEffect(() => {
    if (token) {
      listFiles(token).then(setFiles);
    }
  }, [token, output]);

  // Handler login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      if (data.token) {
        setToken(data.token);
        setUserEmail(data.user.email);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user.email);
        setAuthMessage("Login effettuato!");
      } else {
        setAuthMessage(data.error || "Errore login");
      }
    } catch (err) {
      setAuthMessage("Errore: " + err.message);
    }
  };

  // Handler registrazione
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(email, password);
      if (data.user) {
        setAuthMessage("Registrazione avvenuta! Effettua il login.");
      } else {
        setAuthMessage(data.error || "Errore registrazione");
      }
    } catch (err) {
      setAuthMessage("Errore: " + err.message);
    }
  };

  // Upload file
  const handleUpload = async (file) => {
    if (!file) return;
    try {
      await uploadFile(file, token);
      setNotifications(n => [...n, { id: Date.now(), message: "File caricato!", type: "success" }]);
      const filesList = await listFiles(token);
      setFiles(filesList);
    } catch (err) {
      setNotifications(n => [...n, { id: Date.now(), message: "Errore upload!", type: "error" }]);
    }
  };

  // Generazione AI-APP
  const handleGenerate = async () => {
    try {
      setOutput("...generazione AI in corso...");
      const result = await sendAIMessage({
        prompt,
        fileIds: files.map(f => f.id)
      }, token);
      setOutput(result);
      setNotifications(n => [...n, { id: Date.now(), message: "UI generata da AI!", type: "success" }]);
    } catch (err) {
      setOutput("");
      setNotifications(n => [...n, { id: Date.now(), message: "Errore AI: " + err.message, type: "error" }]);
    }
  };

  // Se non loggato, mostra form di login/registrazione
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-80">
          <h2 className="text-xl font-bold mb-4 text-center">Login / Register</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="email" placeholder="Email"
              value={email} onChange={e => setEmail(e.target.value)}
              className="border rounded px-3 py-2 bg-gray-100"
              required
            />
            <input
              type="password" placeholder="Password"
              value={password} onChange={e => setPassword(e.target.value)}
              className="border rounded px-3 py-2 bg-gray-100"
              required
            />
            <button type="submit" className="btn mt-2">Login</button>
            <button type="button" onClick={handleRegister} className="btn mt-1 bg-green-500">
              Registrati
            </button>
            {authMessage && (
              <div className="mt-2 text-center text-sm text-gray-700">
                {authMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }

  // Se loggato, mostra editor e preview
  return (
    <div className="flex min-h-screen">
      {/* Sidebar prompt/editing */}
      <aside className="w-1/3 bg-gray-50 dark:bg-gray-900 border-r px-4 py-6 flex flex-col">
        <div className="mb-2">Benvenuto, {userEmail}</div>
        <button
          className="btn mb-2 bg-red-500"
          onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); setToken(""); }}
        >
          Logout
        </button>
        <PromptDropdown
          promptList={promptList}
          selectedPrompt={selectedPrompt}
          onSelect={setSelectedPrompt}
        />
        <PromptEditor value={prompt} onChange={setPrompt} />
        <PromptGenAI onGenerate={setPrompt} />
        <UniversalUploader onUpload={handleUpload} />
        <ProjectManager token={token} onSelect={p => setPrompt(p.content)} />
        <button className="btn my-3" onClick={handleGenerate}>Genera AI-APP</button>
      </aside>

      {/* Preview AI-APP */}
      <main className="flex-1 px-8 py-6">
        <PreviewPanel output={output} />
      </main>

      {/* Notifiche */}
      <NotificationStack
        notifications={notifications}
        onClose={id => setNotifications(n => n.filter(x => x.id !== id))}
      />
    </div>
  );
}

export default App;
