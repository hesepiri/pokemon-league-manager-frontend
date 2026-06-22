import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Header.css";

function Header({ isLoggedIn, onLoginClick, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const isSavedRoute = location.pathname === "/saved-pokemons";

  return (
    <header className={`header ${isSavedRoute ? "header_theme_light" : ""}`}>
      <div className="header__container">
        {/* Usamos Link para que el logo funcione como botón de inicio */}
        <Link
          to="/"
          className="header__logo"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Pokémon League Manager
        </Link>

        {/* Pasamos las propiedades y el contexto al componente de navegación */}
        <Navigation
          isLoggedIn={isLoggedIn}
          onLoginClick={onLoginClick}
          onSignOut={onSignOut}
          currentUser={currentUser}
          isSavedRoute={isSavedRoute}
        />
      </div>
    </header>
  );
}

export default Header;
