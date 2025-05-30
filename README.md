# AI-WEB – La piattaforma no-code basata su AI

AI-WEB permette di generare applicazioni web complete partendo da semplici **prompt** in linguaggio naturale.
Il progetto combina un frontend React con Tailwind CSS e un backend Node/Express
che utilizza Supabase e l'API GPT-4o di OpenAI.

## Visione e missione
- **Visione:** abbattere le barriere tecnologiche rendendo lo sviluppo software accessibile a tutti.
- **Missione:** offrire un'esperienza di creazione rapida e personalizzata sfruttando la potenza dell'intelligenza artificiale.

## Caratteristiche principali
- Autenticazione e database tramite Supabase
- Gestione di prompt personalizzati
- Upload di file con estrazione testo automatica
  (supporto OCR per immagini PNG/JPG)
- API Node/Express pronte all'uso
- Frontend reattivo con anteprima dinamica dell'app generata

## Destinatari
Questa documentazione è pensata per:
- **Investitori** interessati a una soluzione innovativa e scalabile
- **Clienti finali** che desiderano creare applicazioni senza conoscere il codice
- **Team tecnici** che vogliono estendere o personalizzare la piattaforma

## Avvio rapido
1. Copiare `backend/.env.example` in `backend/.env` e inserire le proprie chiavi
   Supabase e OpenAI. **Non condividere o versionare il file `.env` reale.**
   È possibile specificare il modello OpenAI desiderato impostando `OPENAI_MODEL`.
2. Copiare `frontend/.env.example` in `frontend/.env` per configurare l'URL delle API.
3. Installare le dipendenze con `npm install` all'interno di `backend` e `frontend`.
4. Avviare il backend con `npm start` (cartella `backend`) e il frontend con
   `npm run dev` (cartella `frontend`).
   L'app sarà accessibile su `http://localhost:5173/`. Se si esegue in Docker o
   in ambienti remoti, avviare Vite con l'opzione `--host` oppure utilizzare il
   `vite.config.js` fornito, che imposta `host: true`.
   Assicurarsi che la porta configurata per il backend corrisponda a quella
   specificata in `VITE_API_URL` (ad esempio `3000`).

## Struttura del progetto
- **backend/** – codice server Node/Express e utilità
- **frontend/** – applicazione React con Vite e Tailwind
- **schema.sql** – esempio di schema per Supabase

Per ulteriori dettagli consultare i singoli file della repository.

## Licenza

Questo progetto è distribuito con licenza MIT. Vedi il file `LICENSE` per i dettagli.
