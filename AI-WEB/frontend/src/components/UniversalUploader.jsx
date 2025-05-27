// frontend/src/components/UniversalUploader.jsx
import React, { useRef } from "react";
export default function UniversalUploader({ onUpload }) {
  const ref = useRef();
  return (
    <div className="my-2">
      <input
        ref={ref}
        type="file"
        className="hidden"
        onChange={e => {
          if (e.target.files[0]) onUpload(e.target.files[0]);
          ref.current.value = "";
        }}
      />
      <button className="btn" onClick={() => ref.current.click()}>
        Carica file (PDF, Word, Excel, Immagine)
      </button>
    </div>
  );
}
