import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isLoggedIn, onLoginClick, onSignOut, currentUser }) {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {/* Enlace siempre visible */}
        <li className="navigation__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_active" : ""}`
            }
          >
            Inicio
          </NavLink>
        </li>

        {/* Enlace público original de tu proyecto (Opcional, puedes quitarlo si no lo necesitas en el header) */}
        <li className="navigation__item">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_active" : ""}`
            }
          >
            Dashboard
          </NavLink>
        </li>

        {/* Enlace protegido: Solo se muestra si el usuario inició sesión */}
        {isLoggedIn && (
          <li className="navigation__item">
            <NavLink
              to="/saved-pokemons"
              className={({ isActive }) =>
                `navigation__link ${isActive ? "navigation__link_active" : ""}`
              }
            >
              Pokémones guardados
            </NavLink>
          </li>
        )}

        {/* Renderizado condicional del botón de autenticación */}
        <li className="navigation__item">
          {isLoggedIn ? (
            <button
              type="button"
              className="navigation__button navigation__button_type_logout"
              onClick={onSignOut}
            >
              <span className="navigation__user-name">
                {currentUser?.name || "Entrenador"}
              </span>
              {/* Ícono de logout (puedes agregar un SVG o manejarlo por CSS background) */}
              <span className="navigation__logout-icon"></span>
            </button>
          ) : (
            <button
              type="button"
              className="navigation__button"
              onClick={onLoginClick}
            >
              Iniciar Sesión
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
