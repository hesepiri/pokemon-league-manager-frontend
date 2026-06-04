import React from "react";
import "./SearchForm.css";

function SearchForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // La lógica de búsqueda con la PokéAPI se integrará en sprints posteriores
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Introduce el nombre del Pokémon..."
        className="search-form__input"
        required
      />
      <button type="submit" className="search-form__button">
        Buscar
      </button>
    </form>
  );
}

export default SearchForm;
