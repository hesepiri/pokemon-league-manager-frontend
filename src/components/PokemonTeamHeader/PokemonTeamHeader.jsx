import React from "react";
import "./PokemonTeamHeader.css";

function PokemonTeamHeader() {
  // Datos temporales simulados (placeholders para ahorrar tiempo)
  const trainerName = "Héctor Pinedo";
  const teamCount = 5;
  const topTypes = "Eléctrico, Fuego";

  return (
    <section className="team-header">
      <div className="team-header__container">
        <span className="team-header__subtitle">Tu Colección</span>
        <h2 className="team-header__title">
          {trainerName}, tienes {teamCount} Pokémon en tu equipo
        </h2>
        <p className="team-header__summary">
          Dominas los tipos:{" "}
          <span className="team-header__bold">{topTypes} y 2 más</span>
        </p>
      </div>
    </section>
  );
}

export default PokemonTeamHeader;
