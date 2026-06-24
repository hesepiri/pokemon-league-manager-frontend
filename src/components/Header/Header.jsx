import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ isLoggedIn, onLoginClick, onSignOut }) {
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

        {/* Quitamos la prop currentUser. Ahora Navigation la consumirá del Contexto directamente */}
        <Navigation
          isLoggedIn={isLoggedIn}
          onLoginClick={onLoginClick}
          onSignOut={onSignOut}
          isSavedRoute={isSavedRoute}
        />
      </div>
    </header>
  );
}

export default Header;
