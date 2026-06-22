import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";

// Componentes estructurales
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import PokemonCard from "../PokemonCard/PokemonCard";
import NotFound from "../NotFound/NotFound";
import pokeApi from "../../utils/pokeApi";

// Componentes Etapa 3
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../Login/Login";
import Register from "../Register/Register";
import InfoTooltip from "../InfoTooltip/InfoTooltip"; // <-- Importación añadida
import SavedPokemons from "../SavedPokemons/SavedPokemons";

function App() {
  // Estados de Búsqueda
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

  // Estados de Autenticación
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedPokemons, setSavedPokemons] = useState([]);

  // Estados de Modales
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false); // <-- Estado añadido
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  // Efectos
  useEffect(() => {
    const savedPokemon = localStorage.getItem("pokemonSearchResults");
    if (savedPokemon) {
      setPokemonList(JSON.parse(savedPokemon));
    }
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setIsLoggedIn(true);
            return mainApi.getSavedPokemons(jwt);
          }
        })
        .then((pokemons) => {
          if (pokemons) setSavedPokemons(pokemons);
        })
        .catch((err) => {
          console.error(`Error al validar token: ${err}`);
          localStorage.removeItem("jwt");
        });
    }
  }, [isLoggedIn]);

  // Manejadores de Modales
  const handleOpenLogin = () => {
    setApiError("");
    setIsLoginPopupOpen(true);
    setIsRegisterPopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  const handleOpenRegister = () => {
    setApiError("");
    setIsRegisterPopupOpen(true);
    setIsLoginPopupOpen(false);
  };

  const handleClosePopups = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsInfoTooltipOpen(false); // <-- Cierre añadido
    setApiError("");
  };

  // Manejadores de Autenticación
  const handleRegister = (email, password, name) => {
    mainApi
      .register(email, password, name)
      .then((res) => {
        if (res) {
          setIsRegisterPopupOpen(false);
          setIsInfoTooltipOpen(true); // <-- Abre modal de éxito
        }
      })
      .catch((err) => {
        console.error(err);
        setApiError(
          "Este correo electrónico ya está en uso o los datos son inválidos.",
        );
      });
  };

  const handleLogin = (email, password) => {
    mainApi
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          handleClosePopups();
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        setApiError("Correo electrónico o contraseña incorrectos.");
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    setSavedPokemons([]);
    navigate("/");
  };

  // Manejadores de Pokémon
  const handleSavePokemon = (pokemonData) => {
    const jwt = localStorage.getItem("jwt");
    mainApi
      .savePokemon(pokemonData, jwt)
      .then((newPokemon) => setSavedPokemons([newPokemon, ...savedPokemons]))
      .catch((err) => console.error(`Error al guardar pokemon: ${err}`));
  };

  const handleDeletePokemon = (pokemonId) => {
    const jwt = localStorage.getItem("jwt");
    mainApi
      .deletePokemon(pokemonId, jwt)
      .then(() =>
        setSavedPokemons((state) => state.filter((p) => p._id !== pokemonId)),
      )
      .catch((err) => console.error(`Error al eliminar pokemon: ${err}`));
  };

  // Búsqueda API Externa
  const handleSearchSubmit = async (keyword) => {
    const cleanKeyword = keyword.trim().toLowerCase();
    if (!cleanKeyword) return;
    setIsLoading(true);
    setSearchError("");
    setPokemonList([]);
    setVisibleCount(3);
    navigate("/dashboard");

    try {
      const data = await pokeApi.getInitialPokemons(1400);
      const spanishOverrides = {
        aegislash: "aegislash-shield",
        basculegion: "basculegion-male",
        basculin: "basculin-red-striped",
        bramaluna: "roaring-moon",
        "chi yu": "chi-yu",
        "chien pao": "chien-pao",
        "codigo cero": "type-null",
        "código cero": "type-null",
        colagrito: "scream-tail",
        colmilloalargado: "great-tusk",
        colmilloargo: "great-tusk",
        coronacorte: "iron-crown",
        darmanitan: "darmanitan-standard",
        deoxys: "deoxys-normal",
        eiscue: "eiscue-ice",
        electrofuria: "raging-bolt",
        electrofuror: "raging-bolt",
        enamorus: "enamorus-incarnate",
        "farfetch'd": "farfetchd",
        farfetchd: "farfetchd",
        ferrocuello: "iron-jugulis",
        ferrodada: "iron-treads",
        ferrojugular: "iron-jugulis",
        ferromata: "iron-moth",
        ferromole: "iron-boulder",
        ferromotita: "iron-moth",
        ferropaladin: "iron-valiant",
        ferropalmas: "iron-hands",
        ferroporojo: "iron-valiant",
        ferropuas: "iron-thorns",
        ferropúas: "iron-thorns",
        ferrotesta: "iron-crown",
        ferroverdor: "iron-leaves",
        flabébé: "flabebe",
        flabebe: "flabebe",
        flamariete: "gouging-fire",
        furioseta: "brute-bonnet",
        giratina: "giratina-altered",
        gourgeist: "gourgeist-average",
        "ho oh": "ho-oh",
        "iron valiant": "iron-valiant",
        keldeo: "keldeo-ordinary",
        landorus: "landorus-incarnate",
        lycanroc: "lycanroc-midday",
        melenalete: "flutter-mane",
        melenaleteo: "flutter-mane",
        meloetta: "meloetta-aria",
        meowstic: "meowstic-male",
        "mime jr": "mime-jr",
        "mime jr.": "mime-jr",
        mimikyu: "mimikyu-disguised",
        minior: "minior-red-meteor",
        morpeko: "morpeko-full-belly",
        "mr mime": "mr-mime",
        "mr. mime": "mr-mime",
        "mr rime": "mr-rime",
        "mr. rime": "mr-rime",
        "nidoran f": "nidoran-f",
        "nidoran female": "nidoran-f",
        "nidoran hembra": "nidoran-f",
        "nidoran m": "nidoran-m",
        "nidoran macho": "nidoran-m",
        "nidoran male": "nidoran-m",
        "o gerpon": "ogerpon-teal-mask",
        ogerpon: "ogerpon-teal-mask",
        ondagua: "walking-wake",
        pelarena: "sandy-shocks",
        "porygon z": "porygon-z",
        pumpkaboo: "pumpkaboo-average",
        reptalada: "slither-wing",
        "roaring moon": "roaring-moon",
        shaymin: "shaymin-land",
        "sirfetch'd": "sirfetchd",
        sirfetchd: "sirfetchd",
        "tapu bulu": "tapu-bulu",
        "tapu fini": "tapu-fini",
        "tapu koko": "tapu-koko",
        "tapu lele": "tapu-lele",
        thundurus: "thundurus-incarnate",
        "ting lu": "ting-lu",
        tornadus: "tornadus-incarnate",
        toxtricity: "toxtricity-amped",
        urshifu: "urshifu-single-strike",
        wishiwashi: "wishiwashi-solo",
        "wo chien": "wo-chien",
        zygarde: "zygarde-50",
        "zygarde perro": "zygarde-10",
        "zygarde 10": "zygarde-10",
        "zygarde 100": "zygarde-complete",
        "zygarde completo": "zygarde-complete",
      };

      const searchTerms = [cleanKeyword];
      Object.keys(spanishOverrides).forEach((spanishName) => {
        if (spanishName.includes(cleanKeyword))
          searchTerms.push(spanishOverrides[spanishName]);
      });

      const filteredResults = data.results.filter((pokemon) =>
        searchTerms.some((term) => pokemon.name.includes(term)),
      );

      if (filteredResults.length === 0) {
        setSearchError("No se ha encontrado nada");
        localStorage.removeItem("pokemonSearchResults");
        setIsLoading(false);
        return;
      }

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
      setSearchError("Lo sentimos, algo ha salido mal durante la solicitud.");
      localStorage.removeItem("pokemonSearchResults");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowMore = () => setVisibleCount((prev) => prev + 3);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          onLoginClick={handleOpenLogin}
          onSignOut={handleSignOut}
        />

        <Routes>
          <Route path="/" element={<Main onSearch={handleSearchSubmit} />} />

          <Route
            path="/dashboard"
            element={
              <main className="content">
                <section className="pokemon-dashboard">
                  <h2 className="pokemon-dashboard__title">
                    Resultados de la Liga Pokémon
                  </h2>
                  {isLoading && <Preloader />}
                  {!isLoading && searchError === "No se ha encontrado nada" && (
                    <NotFound />
                  )}
                  {!isLoading &&
                    searchError &&
                    searchError !== "No se ha encontrado nada" && (
                      <p className="pokemon-dashboard__api-error">
                        {searchError}
                      </p>
                    )}

                  {!isLoading && pokemonList.length > 0 && (
                    <div className="pokemon-dashboard__container">
                      <div className="pokemon-dashboard__grid">
                        {pokemonList.slice(0, visibleCount).map((pokemon) => (
                          <PokemonCard
                            key={pokemon.id}
                            pokemon={pokemon}
                            isLoggedIn={isLoggedIn}
                            onSavePokemon={handleSavePokemon}
                            onDeletePokemon={handleDeletePokemon}
                            savedPokemons={savedPokemons}
                          />
                        ))}
                      </div>
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
                      Busca un Pokémon para ver sus estadísticas...
                    </p>
                  )}
                </section>
              </main>
            }
          />

          <Route
            path="/saved-pokemons"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                onLoginClick={handleOpenLogin}
              >
                <SavedPokemons
                  savedPokemons={savedPokemons}
                  onDeletePokemon={handleDeletePokemon}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <About />
        <Footer />

        <Login
          isOpen={isLoginPopupOpen}
          onClose={handleClosePopups}
          onLogin={handleLogin}
          onSwitchToRegister={handleOpenRegister}
          apiError={apiError}
        />

        <Register
          isOpen={isRegisterPopupOpen}
          onClose={handleClosePopups}
          onRegister={handleRegister}
          onSwitchToLogin={handleOpenLogin}
          apiError={apiError}
        />

        {/* --- MODAL DE ÉXITO AÑADIDO --- */}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={handleClosePopups}
          onSwitchToLogin={handleOpenLogin}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
