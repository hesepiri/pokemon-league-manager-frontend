import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setKeyword(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (keyword.trim() === "") {
      setError("Por favor, introduzca una palabra clave");
      return;
    }

    console.log("Palabra clave a buscar:", keyword);

    // ¡Activamos la prop! Esto envía el término limpio a App.jsx y ejecuta la API
    if (onSearch) {
      onSearch(keyword);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      {/* Nuevo contenedor: mantiene el input y el botón aislados del error */}
      <div className="search-form__container">
        <input
          type="text"
          className="search-form__input"
          placeholder="Introduce un Pokémon (ej. Pikachu)"
          value={keyword}
          onChange={handleChange}
          required
        />
        <button type="submit" className="search-form__button">
          Buscar
        </button>
      </div>

      {/* El error queda fuera del flujo flex principal */}
      {error && <span className="search-form__error">{error}</span>}
    </form>
  );
}

export default SearchForm;
