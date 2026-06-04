import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import "./Main.css";

function Main() {
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
      </section>
    </main>
  );
}

export default Main;
