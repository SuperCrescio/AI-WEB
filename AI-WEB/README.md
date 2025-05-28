# AI-WEB – Piattaforma No-Code per AI App basate su Prompt

Questa repository contiene l'applicazione **AI-WEB**. Il progetto permette di creare applicazioni AI senza codice utilizzando Supabase per autenticazione e database, OpenAI GPT‑4 per l'intelligenza artificiale e un frontend React con Tailwind CSS.

## Caratteristiche principali
- Autenticazione tramite Supabase
- Gestione di prompt personalizzati (AI‑APP)
- Upload e gestione dei file utente
- API backend in Node/Express
- Frontend reattivo con componenti dinamici

## Avvio rapido
1. Copiare `backend/.env.example` in `backend/.env` e impostare `OPENAI_API_KEY`,
   `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY` con i
   valori del proprio progetto Supabase e OpenAI.
2. Installare le dipendenze eseguendo `npm install` dentro le cartelle `backend` e `frontend`.
3. Avviare il backend con `npm start` (dalla cartella `backend`) e il frontend con `npm run dev` (dalla cartella `frontend`).

Per maggiori dettagli consultare la documentazione nei singoli file del progetto.
