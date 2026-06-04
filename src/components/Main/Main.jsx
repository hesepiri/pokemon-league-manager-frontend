import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import "./Main.css";

function Main() {
  // Usamos una ilustración oficial limpia y de alta resolución de la base de datos de assets de Pokémon
  const heroImageURL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png";
  /* 
  https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/item/poke-ball.png 
  https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png
  */

  return (
    <main className="main-content">
      <section className="hero">
        <div className="hero__content">
          <h2 className="hero__title">¿Qué Pokémon estás buscando?</h2>
          <p className="hero__subtitle">
            Encuentra estadísticas, habilidades y gestiona tu equipo ideal para
            la Liga.
          </p>
          <SearchForm />
        </div>
        {/* Aquí está la imagen física que se acomodará a la derecha */}
        <div className="hero__image-container">
          <img
            src={heroImageURL}
            alt="Pokemon League Manager Banner"
            className="hero__image"
          />
        </div>
      </section>
    </main>
  );
}

export default Main;
