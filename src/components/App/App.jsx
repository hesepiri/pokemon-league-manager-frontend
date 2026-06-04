import { useState } from "react";
import { Routes, Route } from "react-router-dom"; // <-- Importante para el enrutado
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function App() {
  // Estado para controlar la apertura y cierre del modal de inicio de sesión
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  return (
    <div className="page">
      {/* Pasamos la función para abrir el modal al Header */}
      <Header onLoginClick={handleOpenPopup} />
      {/* 3. Rutas: Contenedor principal de pantallas */}
      <Routes>
        {/* Ruta obligatoria 1: Muestra la página principal del proyecto */}
        <Route path="/" element={<Main />} />

        {/* Ruta personalizada obligatoria para mostrar los datos de la PokéAPI */}
        <Route
          path="/dashboard"
          element={
            <main className="content">
              <section className="pokemon-dashboard">
                <h2 className="pokemon-dashboard__title">
                  Resultados de la Liga Pokémon
                </h2>
                <p className="pokemon-dashboard__placeholder">
                  Busca un Pokémon en la página de inicio para ver sus
                  estadísticas aquí...
                </p>
              </section>
            </main>
          }
        />
      </Routes>

      {/* Componentes de presentación obligatorios al fondo */}
      <About />
      <Footer />

      {/* Ventana modal controlada por el estado */}
      <PopupWithForm isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
}

export default App;
