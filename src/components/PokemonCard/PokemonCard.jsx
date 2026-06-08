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
      <div className="pokemon-card__image-wrapper">
        <img
          src={
            pokemon.sprites.other["official-artwork"].front_default ||
            pokemon.sprites.front_default
          }
          alt={pokemon.name}
          className="pokemon-card__image"
        />
      </div>

      <div className="pokemon-card__content">
        <span className="pokemon-card__id">Pokédex #{pokemon.id}</span>

        {/* Tipos ahora renderizados abajo de forma segura */}
        <div className="pokemon-card__types-container">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className={`pokemon-card__type pokemon-card__type_type_${t.type.name}`}
            >
              {t.type.name.toUpperCase()}
            </span>
          ))}
        </div>

        <h3 className="pokemon-card__name">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h3>

        {/* Bloque de habilidades estilizado */}
        <div className="pokemon-card__abilities-container">
          <span className="pokemon-card__abilities-title">Habilidades:</span>
          <div className="pokemon-card__abilities-list">
            {pokemon.abilities.map((a) => (
              <span
                key={a.ability.name}
                className="pokemon-card__ability-badge"
              >
                {a.ability.name.replace("-", " ")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default PokemonCard;
