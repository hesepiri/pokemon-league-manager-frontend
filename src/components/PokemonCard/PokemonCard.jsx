import React from "react";
import "./PokemonCard.css";

function PokemonCard({ pokemon }) {
  // Ponemos la primera letra en mayúscula para que se vea estético
  const pokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  // Extraemos la ilustración oficial de alta resolución
  const imageUrl = pokemon.sprites?.other?.["official-artwork"]?.front_default;

  // Mapeamos las habilidades separadas por comas
  const abilities = pokemon.abilities
    ?.map(
      (item) =>
        item.ability.name.charAt(0).toUpperCase() + item.ability.name.slice(1),
    )
    .join(", ");

  return (
    <article className="pokemon-card">
      {/* CONTENEDOR FLEX: Agrupa las etiquetas para que se alineen horizontalmente */}
      <div className="pokemon-card__types-container">
        {pokemon.types?.map((item, index) => {
          const typeName = item.type.name.toLowerCase();
          return (
            <span
              key={index}
              className={`pokemon-card__type pokemon-card__type_type_${typeName}`}
            >
              {item.type.name.toUpperCase()}
            </span>
          );
        })}
      </div>

      <div className="pokemon-card__image-wrapper">
        <img src={imageUrl} alt={pokemonName} className="pokemon-card__image" />
      </div>

      <div className="pokemon-card__content">
        <span className="pokemon-card__id">
          Pokédex #{String(pokemon.id).padStart(3, "0")}
        </span>

        <h3 className="pokemon-card__name">{pokemonName}</h3>

        <p className="pokemon-card__description">
          <strong>Habilidades:</strong> {abilities || "Ninguna"}
        </p>
      </div>
    </article>
  );
}

export default PokemonCard;
