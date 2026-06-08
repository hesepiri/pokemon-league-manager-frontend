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

  // Manejador asíncrono bilingüe automatizado
  // Manejador asíncrono bilingüe con soporte para búsquedas parciales
  const handleSearchSubmit = async (keyword) => {
    const cleanKeyword = keyword.trim().toLowerCase();
    if (!cleanKeyword) return;

    setIsLoading(true);
    setSearchError("");
    setPokemonList([]);
    setVisibleCount(3);

    navigate("/dashboard");

    try {
      // 1. Traemos el catálogo completo de la PokéAPI (en inglés)
      const data = await pokeApi.getInitialPokemons(1400);

      // 2. Diccionario de equivalencias oficiales
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

      // 3. DETECTOR DE COINCIDENCIAS PARCIALES EN ESPAÑOL
      // Creamos una lista de términos en inglés que queremos buscar en la API
      const searchTerms = [cleanKeyword];

      // Iteramos el diccionario: si el usuario escribió una parte del nombre en español (ej. "ferro")
      // añadimos el nombre en inglés correspondiente (ej. "iron-bundle", "iron-treads") a los términos de búsqueda
      Object.keys(spanishOverrides).forEach((spanishName) => {
        if (spanishName.includes(cleanKeyword)) {
          searchTerms.push(spanishOverrides[spanishName]);
        }
      });

      // 4. FILTRADO MULTI-TÉRMINO
      // El Pokémon pasa el filtro si su nombre en inglés contiene CUALQUIERA de nuestros términos
      const filteredResults = data.results.filter((pokemon) =>
        searchTerms.some((term) => pokemon.name.includes(term)),
      );

      if (filteredResults.length === 0) {
        setSearchError("No se ha encontrado nada");
        localStorage.removeItem("pokemonSearchResults");
        setIsLoading(false);
        return;
      }

      // 5. Descarga de detalles en paralelo
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
