// frontend/src/components/PreviewPanel.jsx
import React, { useState } from "react";
import {
  Text, Card, Chart, ButtonsGroup, Dropdown, Slider, Timer, Stepper,
  Menu, Switch, UserBubble, NotificationStack
} from "./index"; // Assicurarsi che index.js esporti tutti i componenti

// Mappa tipi stringa → componente React
const COMPONENTS = {
  text:    Text,
  card:    Card,
  chart:   Chart,
  buttons: ButtonsGroup,
  dropdown: Dropdown,
  slider:  Slider,
  timer:   Timer,
  stepper: Stepper,
  menu:    Menu,
  switch:  Switch,
  userbubble: UserBubble,
  notification: null, // gestito separatamente
  // Altri tipi possono essere aggiunti
};

// Renderizza un singolo elemento UI dall’output AI
function renderElement(elem, idx, onAction, setNotification) {
  if (!elem || typeof elem !== "object") return null;
  // Notifica speciale
  if (elem.type === "notification") {
    setNotification(n => [...n, { ...elem, id: Date.now() + idx }]);
    return null;
  }
  const Comp = COMPONENTS[elem.type?.toLowerCase()];
  if (!Comp) {
    // Se tipo non riconosciuto, mostra JSON grezzo
    return <Text key={idx} content={JSON.stringify(elem, null, 2)} />;
  }
  return (
    <Comp
      key={elem.id || idx}
      {...elem}
      onSelect={val => onAction && onAction(val, elem)}
      onChange={val => onAction && onAction(val, elem)}
    />
  );
}

export default function PreviewPanel({ output }) {
  const [notifications, setNotifications] = useState([]);
  // Parsing output AI (JSON) in elementi da renderizzare
  let elements = [];
  try {
    let data = typeof output === "string" ? JSON.parse(output) : output;
    if (Array.isArray(data)) elements = data;
    else if (data && typeof data === "object") {
      if (Array.isArray(data.ui)) elements = data.ui;
      else elements = [data];
    }
  } catch {
    if (output) elements = [{ type: "text", content: output }];
  }

  // Handler di azioni UI (es. eventi pulsanti)
  const handleAction = (value, elem) => {
    console.log("Azione utente:", value, "dal componente:", elem);
    // Esempio: si potrebbe triggerare analisi o altro
  };

  return (
    <div>
      {elements.length > 0 ? (
        elements.map((elem, idx) =>
          renderElement(elem, idx, handleAction, setNotifications)
        )
      ) : (
        <div className="text-gray-400 italic">Genera la tua AI-APP!</div>
      )}
      {/* Notifiche persistenti */}
      <NotificationStack
        notifications={notifications}
        onClose={id => setNotifications(n => n.filter(x => x.id !== id))}
      />
    </div>
  );
}
