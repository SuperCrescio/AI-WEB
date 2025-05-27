import React, { useState } from "react";
import {
  Text, Card, Chart, ButtonsGroup, Dropdown, Slider, Timer, Stepper,
  Menu, Switch, UserBubble, NotificationStack
} from "./index";

// Mappa type JSON → componente React reale
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
  notification: null, // handled via NotificationStack
  // Aggiungi altri qui...
};

/**
 * Dato l'output JSON, genera l'albero UI dinamico
 * Output può essere: array di elementi, oggetto unico, ecc.
 */
function renderElement(elem, idx, onAction, setNotification) {
  if (!elem || typeof elem !== "object") return null;
  // Notification? Usa lo stack notifiche.
  if (elem.type === "notification") {
    setNotification(n => [...n, { ...elem, id: Date.now() + idx }]);
    return null;
  }
  const Comp = COMPONENTS[elem.type?.toLowerCase()];
  if (!Comp) {
    // Se non c'è tipo noto, mostra il JSON raw.
    return <Text key={idx} content={JSON.stringify(elem, null, 2)} />;
  }
  // Tutti gli handler (su bottoni, selezioni, ecc) possono chiamare onAction
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
  const [userSelection, setUserSelection] = useState(null);

  // Supporta output: array, oggetto singolo o testo puro
  let elements = [];
  try {
    let data = typeof output === "string" ? JSON.parse(output) : output;
    if (Array.isArray(data)) elements = data;
    else if (typeof data === "object" && data !== null) {
      if (Array.isArray(data.ui)) elements = data.ui;
      else elements = [data];
    }
  } catch {
    if (output) elements = [{ type: "text", content: output }];
  }

  // Azioni (bottoni, dropdown, etc)
  function handleAction(val, elem) {
    setUserSelection({ ...elem, value: val });
    // Puoi gestire azioni avanzate (es. invio verso AI) qui
    // oppure propagare l’evento al parent se serve
  }

  return (
    <div className="min-h-[80vh] bg-white dark:bg-gray-800 rounded p-6 shadow-inner overflow-y-auto">
      <h2 className="font-bold text-lg mb-2">Anteprima AI-APP</h2>
      {elements.length > 0 ? (
        elements.map((elem, idx) =>
          renderElement(elem, idx, handleAction, setNotifications)
        )
      ) : (
        <div className="text-gray-400 italic">Genera la tua AI-APP!</div>
      )}
      {/* Stack notifiche, persistente e richiamato da ogni UI */}
      <NotificationStack notifications={notifications} onClose={id =>
        setNotifications(n => n.filter(x => x.id !== id))
      } />
    </div>
  );
}
