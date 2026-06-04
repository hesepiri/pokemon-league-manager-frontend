import React from "react";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ onLoginClick }) {
  return (
    <header className="header">
      <div className="header__container">
        {/* En la metodología BEM, combinamos etiquetas semánticas y nombres claros */}
        <span className="header__logo">Pokémon League Manager</span>

        {/* Incluimos el componente de navegación responsable de los enlaces */}
        <Navigation onLoginClick={onLoginClick} />
      </div>
    </header>
  );
}

export default Header;
