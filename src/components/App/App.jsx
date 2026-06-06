import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Preloader from "../Preloader/Preloader";
import PokemonCard from "../PokemonCard/PokemonCard";
import NotFound from "../NotFound/NotFound"; // Importación al inicio
import pokeApi from "../../utils/pokeApi"; // Importación de la API

function App() {
  // 1. ESTADOS
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState(null);
  const [searchError, setSearchError] = useState("");

  const navigate = useNavigate();

  // 2. FUNCIONES DE CONTROL (Solo una declaración de cada una)
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  // 3. MANEJADOR DE BÚSQUEDA ASÍNCRONA
  const handleSearchSubmit = (keyword) => {
    setIsLoading(true);
    setSearchError("");
    setPokemonData(null);

    // ¡La magia está aquí! Redirigimos al dashboard DE INMEDIATO
    navigate("/dashboard");

    pokeApi
      .searchPokemon(keyword)
      .then((data) => {
        console.log("¡Pokémon encontrado desde la API!", data);
        setPokemonData(data);
        // Eliminamos el navigate de aquí, ya viajamos antes
      })
      .catch((err) => {
        console.error(err);
        setSearchError("No se ha encontrado nada");
        // Eliminamos el navigate de aquí también
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="page">
      <Header onLoginClick={handleOpenPopup} />

      <Routes>
        {/* Pasamos la función al Main */}
        <Route path="/" element={<Main onSearch={handleSearchSubmit} />} />

        {/* Ruta para mostrar los datos devueltos */}
        {/* Ruta personalizada para mostrar los datos de la PokéAPI */}
        <Route
          path="/dashboard"
          element={
            <main className="content">
              <section className="pokemon-dashboard">
                <h2 className="pokemon-dashboard__title">
                  Resultados de la Liga Pokémon
                </h2>

                {/* 1. Estado de carga activa el Preloader */}
                {isLoading && <Preloader />}

                {/* 2. Si la API tira error, se monta tu componente con el SVG triste */}
                {!isLoading && searchError && <NotFound />}

                {/* 3. Si todo sale bien, se renderiza la tarjeta en el Grid */}
                {!isLoading && pokemonData && (
                  <div className="pokemon-dashboard__container">
                    <div className="pokemon-dashboard__grid">
                      <PokemonCard pokemon={pokemonData} />
                    </div>
                  </div>
                )}

                {/* 4. Estado neutro inicial */}
                {!isLoading && !pokemonData && !searchError && (
                  <p className="pokemon-dashboard__placeholder">
                    Busca un Pokémon en la página de inicio para ver sus
                    estadísticas aquí...
                  </p>
                )}
              </section>
            </main>
          }
        />
      </Routes>

      <About />
      <Footer />

      <PopupWithForm isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
}

export default App;
