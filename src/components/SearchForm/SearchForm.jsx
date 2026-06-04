import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Aquí se disparará la consulta a la PokéAPI en la etapa 1.2
      console.log("Buscando Pokémon:", searchQuery);
    }
  };

  return (
    <form class="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        class="search-form__input"
        placeholder="Introduce el nombre o ID de tu Pokémon..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        required
      />
      <button type="submit" class="search-form__button">
        Buscar
      </button>
    </form>
  );
}

export default SearchForm;
