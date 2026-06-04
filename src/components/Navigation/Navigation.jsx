import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({ onLoginClick }) {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          {/* NavLink añade automáticamente una clase "active" si estás en esa ruta */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_active" : ""}`
            }
          >
            Inicio
          </NavLink>
        </li>
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
        <li className="navigation__item">
          {/* El botón de acceso que vimos en el Figma */}
          <button
            type="button"
            className="navigation__button"
            onClick={onLoginClick}
          >
            Iniciar Sesión
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
