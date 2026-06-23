import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PokemonCard from "../PokemonCard/PokemonCard";

function SavedPokemons({ savedPokemons, onDeletePokemon }) {
  const currentUser = useContext(CurrentUserContext);

  // Procesamiento y ordenamiento descendente de palabras clave por popularidad
  const keywords = savedPokemons.map((p) => p.keyword || "General");
  const keywordCounts = keywords.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const sortedKeywords = Object.keys(keywordCounts).sort(
    (a, b) => keywordCounts[b] - keywordCounts[a],
  );

  // Declaración directa corregida para que el linter la detecte en uso
  const keywordsText =
    sortedKeywords.length <= 3
      ? sortedKeywords.join(", ")
      : `${sortedKeywords[0]}, ${sortedKeywords[1]} y ${sortedKeywords.length - 2} más`;

  return (
    <main className="saved-pokemons">
      <section className="saved-pokemons__info">
        <p className="saved-pokemons__subtitle">Pokémones guardados</p>
        <h1 className="saved-pokemons__title">
          {currentUser.name}, tienes {savedPokemons.length} pokémones guardados
        </h1>
        {savedPokemons.length > 0 && (
          <p className="saved-pokemons__keywords">
            Por palabras clave: <strong>{keywordsText}</strong>
          </p>
        )}
      </section>

      <section className="saved-pokemons__grid-container">
        <div className="pokemon-dashboard__grid">
          {savedPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon._id} // Uso obligatorio de clave única de la base de datos
              pokemon={pokemon}
              isLoggedIn={true}
              isSavedPage={true}
              onDeletePokemon={onDeletePokemon}
              savedPokemons={savedPokemons}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default SavedPokemons;
