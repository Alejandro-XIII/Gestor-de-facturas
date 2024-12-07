import React, { useState } from "react";
import "./App.css";

function App() {
  const [response, setResponse] = useState(""); // Estado para manejar la información mostrada

  const handleButtonClick = async () => {
    try {
      // Intentar acceder a la cámara trasera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      // Creando un elemento de video para mostrar la vista de la cámara
      const videoElement = document.createElement("video");
      videoElement.srcObject = stream;
      videoElement.play();

      // Añadiendo el video al DOM
      document.body.appendChild(videoElement);
        
      // Agregando botón para tomar la foto
      const captureButton = document.createElement("button");
      captureButton.textContent = "Tomar Foto";
      captureButton.classList.add("capture-button");
      captureButton.onclick = () => takePhoto(videoElement);
      document.body.appendChild(captureButton);
    } catch (error) {
      // Capturar errores y mostrar mensaje
      setResponse(<>
        No se encontraron cámaras en tu dispositivo o se denegaron los permisos.
        <br />
        Detalles del error: {error.message}
      </>);
    }
  };

  const takePhoto = (videoElement) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Detener el video y eliminarlo del DOM
    videoElement.pause();
    videoElement.srcObject.getTracks().forEach((track) => track.stop());
    videoElement.remove();

    // Eliminar el botón de captura
    const captureButton = document.querySelector(".capture-button");
    if (captureButton) {
      captureButton.remove();
    }

    // Convertir la imagen a base64
    const imageData = canvas.toDataURL("image/jpeg");

    // Mostrar la imagen capturada en la pantalla de respuesta
    setResponse(<img src={imageData} alt="Foto capturada" />);
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