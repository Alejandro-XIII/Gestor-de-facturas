import React, { useState } from "react";
import "./App.css";

function App() {
  const [response, setResponse] = useState(""); // Estado para manejar la información mostrada

  const handleButtonClick = () => {
    // Simulamos una respuesta generada
    setResponse("La respuesta aparecerá aquí.");
  };

  return (
    <div>
      <h1>Gestor de facturas</h1>
      {/* Botón */}
      <button onClick={handleButtonClick}>Cámara</button>

      {/* Pantalla de información */}
      <div className="response-box">
        {response || "Por favor tome una foto a la factura"}
      </div>
    </div>
  );
}

export default App;