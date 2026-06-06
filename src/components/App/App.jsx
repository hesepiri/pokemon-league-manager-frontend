import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Preloader from "../Preloader/Preloader";
import PokemonCard from "../PokemonCard/PokemonCard";
import NotFound from "../NotFound/NotFound";
import pokeApi from "../../utils/pokeApi";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Controladores de estado para el lote de 3 en 3 (Rúbrica Etapa 1.2)
  const [pokemonList, setPokemonList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

  const navigate = useNavigate();

  // Leer datos guardados en LocalStorage al montar el componente (Obligatorio)
  useEffect(() => {
    const savedPokemon = localStorage.getItem("pokemonSearchResults");
    if (savedPokemon) {
      setPokemonList(JSON.parse(savedPokemon));
    }
  }, []);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  // Manejador asíncrono robusto para la API
  const handleSearchSubmit = async (keyword) => {
    const cleanKeyword = keyword.trim().toLowerCase();
    if (!cleanKeyword) return;

    setIsLoading(true);
    setSearchError("");
    setPokemonList([]);
    setVisibleCount(3); // Reseteamos el contador siempre a 3

    navigate("/dashboard");

    try {
      // Consumimos el lote de 100 elementos usando tu clase pokeApi
      const data = await pokeApi.getInitialPokemons(100);

      // Filtramos las coincidencias que contengan la palabra clave
      const filteredResults = data.results.filter((p) =>
        p.name.includes(cleanKeyword),
      );

      if (filteredResults.length === 0) {
        setSearchError("No se ha encontrado nada");
        localStorage.removeItem("pokemonSearchResults");
        setIsLoading(false);
        return;
      }

      // Resolvemos el detalle de cada Pokémon en paralelo de manera segura
      const detailedPromises = filteredResults.map((p) =>
        fetch(p.url).then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        }),
      );

      const detailedPokemon = await Promise.all(detailedPromises);

      setPokemonList(detailedPokemon);
      localStorage.setItem(
        "pokemonSearchResults",
        JSON.stringify(detailedPokemon),
      );
    } catch (err) {
      console.error(err);
      // Mensaje de error largo oficial exigido por la lista de comprobación de TripleTen
      setSearchError(
        "Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde.",
      );
      localStorage.removeItem("pokemonSearchResults");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <div className="page">
      <Header onLoginClick={handleOpenPopup} />

      <Routes>
        <Route path="/" element={<Main onSearch={handleSearchSubmit} />} />

        {/* CORRECCIÓN: Colocamos el operador '=' exacto para evitar pantallas rojas */}
        <Route
          path="/dashboard"
          element={
            <main className="content">
              <section className="pokemon-dashboard">
                <h2 className="pokemon-dashboard__title">
                  Resultados de la Liga Pokémon
                </h2>

                {/* 1. Preloader de carga */}
                {isLoading && <Preloader />}

                {/* 2. No se encontró nada */}
                {!isLoading && searchError === "No se ha encontrado nada" && (
                  <NotFound />
                )}

                {/* 3. Mensaje oficial de error de la API */}
                {!isLoading &&
                  searchError &&
                  searchError !== "No se ha encontrado nada" && (
                    <p
                      className="pokemon-dashboard__api-error"
                      style={{
                        color: "#ff2d55",
                        textAlign: "center",
                        maxWidth: "600px",
                        margin: "40px auto",
                        fontFamily: "Inter, sans-serif",
                        lineHeight: "1.5",
                      }}
                    >
                      {searchError}
                    </p>
                  )}

                {/* 4. Bloque de resultados de tarjetas */}
                {!isLoading && pokemonList.length > 0 && (
                  <div className="pokemon-dashboard__container">
                    <div className="pokemon-dashboard__grid">
                      {pokemonList.slice(0, visibleCount).map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                      ))}
                    </div>

                    {/* Botón Mostrar más condicional */}
                    {visibleCount < pokemonList.length && (
                      <button
                        className="pokemon-dashboard__more-button"
                        onClick={handleShowMore}
                      >
                        Mostrar más
                      </button>
                    )}
                  </div>
                )}

                {!isLoading && pokemonList.length === 0 && !searchError && (
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
