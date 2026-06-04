import React from "react";
import "./Header.css";

function Header({ onLoginClick }) {
  return (
    <header className="header">
      <h1 className="header__title">Pokemon League Manager</h1>
      <button type="button" className="header__button" onClick={onLoginClick}>
        Iniciar Sesión
      </button>
    </header>
  );
}

export default Header;
