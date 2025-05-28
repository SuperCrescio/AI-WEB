// frontend/src/store.js
import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // (Lasciato vuoto o personalizzabile)
  return (
    <StoreContext.Provider value={{}}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
