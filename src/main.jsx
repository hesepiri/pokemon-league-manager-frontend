import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // <-- Requerido para que funcionen tus rutas de la Etapa 1.1
import "./vendor/normalize.css"; // <-- Cargamos tus fuentes y resets primero
import "./index.css";
import App from "./components/App/App.jsx"; // <-- Corregimos la ruta hacia tu nueva carpeta modular

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
