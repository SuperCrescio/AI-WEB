// /frontend/src/store.js

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, fetchPrompts, fetchFiles } from "./api";

// Crea il Context
const StoreContext = createContext();

export function StoreProvider({ children }) {
  // User: null se non loggato
  const [user, setUser] = useState(null);
  const [prompt, setPrompt] = useState(""); // Prompt attivo
  const [promptList, setPromptList] = useState([]); // Tutti i prompt utente
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // On mount: verifica se c’è una sessione già attiva
  useEffect(() => {
    const session = supabase.auth.getSession();
    session.then(({ data }) => {
      if (data?.session?.user) {
        setUser(data.session.user);
        caricaPromptUtente(data.session.user.id);
        caricaFilesUtente(data.session.user.id);
      }
    });
  }, []);

  // Carica lista prompt utente
  async function caricaPromptUtente(userId) {
    setLoading(true);
    try {
      const prompts = await fetchPrompts(userId);
      setPromptList(prompts);
      if (prompts.length > 0) setPrompt(prompts[0].content);
    } catch (e) {
      // gestisci errori...
    }
    setLoading(false);
  }

  // Carica lista file utente
  async function caricaFilesUtente(userId) {
    setLoading(true);
    try {
      const fls = await fetchFiles({ id: userId });
      setFiles(fls);
    } catch (e) {
      // gestisci errori...
    }
    setLoading(false);
  }

  // Aggiorna store su login
  function onLogin(utente) {
    setUser(utente);
    caricaPromptUtente(utente.id);
    caricaFilesUtente(utente.id);
  }

  // Logout
  function onLogout() {
    setUser(null);
    setPrompt("");
    setPromptList([]);
    setFiles([]);
  }

  return (
    <StoreContext.Provider
      value={{
        user, setUser,
        prompt, setPrompt,
        promptList, setPromptList,
        files, setFiles,
        loading, setLoading,
        onLogin, onLogout,
        caricaPromptUtente,
        caricaFilesUtente
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

// Hook custom per usare lo store
export function useStore() {
  return useContext(StoreContext);
}
