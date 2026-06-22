import React from "react";
import "./PokemonCard.css";

function PokemonCard({
  pokemon,
  isLoggedIn,
  isSavedPage,
  onSavePokemon,
  onDeletePokemon,
  savedPokemons = [],
}) {
  // 1. Detectamos si el objeto proviene de la DB (tiene _id) o de la PokéAPI (tiene id)
  const isFromDb = !!pokemon._id;

  // 2. Normalizamos los datos dependiendo del origen
  const title = isFromDb
    ? pokemon.title
    : pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const image = isFromDb
    ? pokemon.image
    : pokemon.sprites?.other?.["official-artwork"]?.front_default ||
      pokemon.sprites?.front_default;

  // AQUI EL CAMBIO CLAVE: Si es de API unimos todos los tipos separados por coma y espacio
  const keyword = isFromDb
    ? pokemon.keyword
    : pokemon.types?.map((t) => t.type.name).join(", ") || "normal";

  const abilitiesText = isFromDb
    ? pokemon.text
    : pokemon.abilities
        ?.map(
          (item) =>
            item.ability.name.charAt(0).toUpperCase() +
            item.ability.name.slice(1),
        )
        .join(", ");

  // Campos exclusivos para la BD local
  const date = isFromDb ? pokemon.date : new Date().toLocaleDateString();
  const source = isFromDb ? pokemon.source : "PokéAPI";
  const link = isFromDb
    ? pokemon.link
    : `https://www.pokemon.com/es/pokedex/${pokemon.name}`;

  // 3. Verificamos si este Pokémon ya fue guardado por el usuario actual
  const savedInstance = savedPokemons.find(
    (p) => p.title.toLowerCase() === title.toLowerCase(),
  );
  const isSaved = !!savedInstance;

  // 4. Manejador del botón de guardado/eliminado
  const handleIconClick = () => {
    if (!isLoggedIn) return; // Si no hay sesión, el clic no hace nada (se muestra un tooltip por CSS)

    if (isSavedPage || isFromDb) {
      onDeletePokemon(pokemon._id);
    } else if (isSaved) {
      onDeletePokemon(savedInstance._id);
    } else {
      onSavePokemon({
        keyword,
        title,
        text: abilitiesText,
        date,
        source,
        link,
        image,
      });
    }
  };

  return (
    <article className="pokemon-card">
      {/* Etiqueta visible solo en la ruta protegida. Solo mostramos el primer tipo para el diseño */}
      {isSavedPage && (
        <span className="pokemon-card__keyword-tag">
          {keyword.split(", ")[0].toUpperCase()}
        </span>
      )}

      <div className="pokemon-card__image-wrapper">
        <img src={image} alt={title} className="pokemon-card__image" />

        {/* Botón de acción superpuesto a la imagen */}
        <div className="pokemon-card__button-container">
          {!isLoggedIn && (
            <span className="pokemon-card__tooltip">
              Inicia sesión para guardar
            </span>
          )}
          <button
            type="button"
            className={`pokemon-card__action-button ${
              isSavedPage
                ? "pokemon-card__action-button_type_delete"
                : isSaved
                  ? "pokemon-card__action-button_type_marked"
                  : "pokemon-card__action-button_type_save"
            }`}
            onClick={handleIconClick}
          ></button>
        </div>
      </div>

      <div className="pokemon-card__content">
        {!isFromDb && (
          <span className="pokemon-card__id">Pokédex #{pokemon.id}</span>
        )}

        <div className="pokemon-card__types-container">
          {/* Si es de DB dividimos el string para generar los spans, si es de API mapeamos el arreglo */}
          {isFromDb
            ? keyword.split(", ").map((type) => (
                <span
                  key={type}
                  className={`pokemon-card__type pokemon-card__type_type_${type.toLowerCase().trim()}`}
                >
                  {type.toUpperCase().trim()}
                </span>
              ))
            : pokemon.types?.map((t) => (
                <span
                  key={t.type.name}
                  className={`pokemon-card__type pokemon-card__type_type_${t.type.name}`}
                >
                  {t.type.name.toUpperCase()}
                </span>
              ))}
        </div>

        <h3 className="pokemon-card__name">{title}</h3>

        <div className="pokemon-card__abilities-container">
          <span className="pokemon-card__abilities-title">Habilidades:</span>
          <div className="pokemon-card__abilities-list">
            <span className="pokemon-card__ability-badge">
              {abilitiesText.replace(/-/g, " ")}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PokemonCard;
